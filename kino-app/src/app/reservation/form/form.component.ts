import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { ReservationService } from '../reservation.service';
import { MoviesService } from 'src/app/movies/movies.service';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'
import { Prices, User, UserOrder } from 'src/app/types';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/user-data/store/user-data.selectors';

const customValidator = (source: string, target: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceCtrl = control.get(source)
    const targetCtrl = control.get(target)

    return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value ? { mismatch: true } : null;
  }
}

type AllowedTicketTypes = "normal" | "reduced" | "voucher";
function isAllowedTicketType(value: string): value is AllowedTicketTypes {
  return ['normal', 'reduced', 'voucher'].includes(value);
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {

  reservationForm = this.builder.group({
    userName: this.builder.control('', {
      validators: Validators.required,
    }),
    userLastName: this.builder.control('', {
      validators: Validators.required
    }),
    discountCode: this.builder.control('', {
      validators: Validators.required
    }),
    userPhoneNumber: this.builder.control('', {
      validators: [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]
    }),
    userMail: this.builder.control('', {
      validators: [Validators.required, Validators.email]
    }),
    confirmEmail: this.builder.control('', {
      validators: [Validators.required, Validators.email]
    }),
    userInvoiceForm: this.builder.group({
      userNIP: '',
      userStreet: '',
      userPostCode: "",
      userCity: ""
    })

  }, {
    validators: customValidator('email', 'confirmEmail')
  });

  user?: User;
  pricePerTicketType: Record<AllowedTicketTypes, number>;
  tickets: { seat: string, price: number }[];

  changeTicketType(event: MatButtonToggleChange, seat: string) {
    const targetType = event.value;
    const targetSeat = this.tickets.find(ticket => ticket.seat === seat);
    if (!targetSeat) {
      return;
    }
    if (isAllowedTicketType(targetType)) {
      const targetPrice = this.pricePerTicketType[targetType];
      targetSeat.price = targetPrice;
    }
  }

  get reservationCtrl() {
    return this.reservationForm;
  }

  getPricing = (type: string, priceList: Prices[]) => {
    const pricing = priceList.find(pricing => pricing.type === type);
    if (!pricing) {
      throw new Error(`no normal pricing detected for the type ${type}!`);
    }
    return pricing.price;
  }

  constructor(
    private http: HttpClient,
    private builder: NonNullableFormBuilder,
    public reservationService: ReservationService,
    public moviesService: MoviesService,
    private router: Router,
    private store : Store<{ userData: { user?: User } }>)
     {
    if (!this.reservationService.selectedSeats.length) {
      this.router.navigate([".."]);
    }
    const priceList = this.moviesService.getSelectedShowing().priceList;
    this.pricePerTicketType = {
      normal: this.getPricing("Normalny", priceList),
      reduced: this.getPricing("Ulgowy", priceList),
      voucher: this.getPricing("Voucher", priceList),
    }
    this.tickets = reservationService.selectedSeats.map(seat => ({ seat: seat, price: this.pricePerTicketType.normal }));
    this.store.select(selectUser).subscribe(user => this.user = user);
  }

  emailsMatchValidatorError() {
    return (
      this.reservationForm.getError('mismatch') && this.reservationForm.get('confirmEmail')?.touched
    )
  }

  submitForm() {
    this.reservationForm.markAllAsTouched();

    if (this.reservationForm.invalid) {
      return;
    }
    
    const formData = this.reservationForm.getRawValue();
    const showing = this.moviesService.getSelectedShowing();
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const ticketDayIndex = this.reservationService.selectedDay;
    const dayDifference = Number(ticketDayIndex) - currentDayIndex;
    const ticketDate = new Date(currentDate.setDate(currentDate.getDate() + dayDifference));
    const ticketDateString = `${ticketDate.getDay()+1}/${ticketDate.getMonth()+1}/${ticketDate.getFullYear()}`;

    const tickets = this.reservationService.selectedSeats.map((seat, index) => {
      return {
        id: index,
        title: this.reservationService.selectedReservationMovie?.title,
        date: ticketDateString,
        hour: showing.hour,
        seat: {
          positon: seat,
          type: "Normalny", //TODO: unmock by using ticket type toggle
          price: this.pricePerTicketType.normal, //TODO: unmock
          special: false //TODO: unmock
        }
      }
    });
    
    const reqBody = {
      userName: formData.userName,
      userLastName:  formData.userLastName,
      userMail: formData.userMail,
      discountCode: formData.discountCode,
      userPhoneNumber: formData.userPhoneNumber,
      userInvoiceForm: {
        userNIP: formData.userInvoiceForm.userNIP,
        userStreet: formData.userInvoiceForm.userStreet,
        userPostCode: formData.userInvoiceForm.userPostCode,
        userCity: formData.userInvoiceForm.userCity
      },
      paidAt: Date.now(),
      ticket: tickets,
      userId: this.user?.id
    };
    

    this.http.post<UserOrder>('http://localhost:3000/orders', reqBody).subscribe(response => {
      this.router.navigate([`/successpage/${response.id}`]);
    })
  }

}
