import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../reservation.service';
import { MoviesService } from 'src/app/movies/movies.service';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { UserOrder } from 'src/app/reservation/reservation.types';
import { Price } from 'src/app/movies/movies.types';
import { User } from 'src/app/login/login.types';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/user-data/store/user-data.selectors';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  reservationForm = this.builder.group({
    userName: this.builder.control('', {
      validators: [Validators.required, this.noWhitespaceValidator],
    }),
    userLastName: this.builder.control('', {
      validators: [Validators.required, this.noWhitespaceValidator],
    }),
    discountCode: this.builder.control(''),
    userPhoneNumber: this.builder.control('', {
      validators: [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(9),
        Validators.maxLength(9),
      ],
    }),
    userMail: this.builder.control('', {
      validators: [
        Validators.required,
        Validators.email,
        this.noWhitespaceValidator,
      ],
    }),
    userInvoiceForm: this.builder.group({
      userNIP: this.builder.control('', {
        validators: Validators.pattern('^[0-9]*$'),
      }),
      userStreet: this.builder.control(''),
      userPostCode: this.builder.control(''),
      userCity: this.builder.control(''),
    }),
  });

  blikForm = this.builder.group({
    blikNumber: this.builder.control('', {
      validators: [
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.pattern('^[0-9]*$'),
      ],
    }),
  });

  discount = false;
  isBlikVisible = false;
  invoice = false;
  user?: User;
  checkout: number[] = [];

  addInvoice() {
    this.invoice ? (this.invoice = false) : (this.invoice = true);
  }

  ticketsCheckout() {
    let sum = 0;
    this.checkout.forEach((price) => (sum = +price));
    return sum;
  }

  get reservationCtrl() {
    return this.reservationForm;
  }

  get blikCtrl() {
    return this.blikForm;
  }

  getPricing = (type: string, priceList: Price[]) => {
    const pricing = priceList.find((pricing) => pricing.type === type);
    if (!pricing) {
      throw new Error(`no normal pricing detected for the type ${type}!`);
    }
    return pricing.price;
  };

  constructor(
    private http: HttpClient,
    private builder: NonNullableFormBuilder,
    public reservationService: ReservationService,
    public moviesService: MoviesService,
    private router: Router,
    private store: Store<{ userData: { user?: User } }>
  ) {
    if (!this.reservationService.selectedSeats.length) {
      this.router.navigate(['..']);
    }
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
      if (user) {
        this.reservationForm.patchValue({
          userName: user.userName,
          userLastName: user.userLastName,
          userMail: user.userEmail,
          userPhoneNumber: user.userPhoneNumber,
          userInvoiceForm: { ...user.userInvoiceDetails },
        });
      }
    });
  }

  submitForm() {
    this.reservationForm.markAllAsTouched();

    if (this.reservationForm.invalid) {
      return;
    }

    this.reducePrice();
    this.isBlikVisible = true;
  }

  reducePrice() {
    if (this.reservationForm.controls.discountCode.value === 'DUKE2000') {
      this.discount = true;
    }
  }

  submitBlik() {
    this.reservationForm.markAllAsTouched();
    this.blikForm.markAllAsTouched();

    if (this.reservationForm.invalid || this.blikForm.invalid) {
      return;
    }

    const formData = this.reservationForm.getRawValue();
    const showing = this.moviesService.getSelectedShowing();
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const ticketDayIndex = this.reservationService.selectedDay;
    const dayDifference = Number(ticketDayIndex) - currentDayIndex;
    const ticketDate = new Date(
      currentDate.setDate(currentDate.getDate() + dayDifference)
    );
    const ticketDateString = `${ticketDate.getDay() + 1}/${
      ticketDate.getMonth() + 1
    }/${ticketDate.getFullYear()}`;

    const tickets = this.reservationService.selectedSeats.map((seat, index) => {
      return {
        id: index,
        title: this.reservationService.selectedReservationMovie?.title,
        date: ticketDateString,
        hour: showing.hour,
        seat: this.reservationService.selectedTickets.find(
          (ticket) => ticket.positon === seat
        ),
      };
    });

    const reqBody = {
      userName: formData.userName,
      userLastName: formData.userLastName,
      userMail: formData.userMail,
      discountCode: formData.discountCode,
      userPhoneNumber: formData.userPhoneNumber,
      userInvoiceForm: {
        userNIP: formData.userInvoiceForm.userNIP,
        userStreet: formData.userInvoiceForm.userStreet,
        userPostCode: formData.userInvoiceForm.userPostCode,
        userCity: formData.userInvoiceForm.userCity,
      },
      paidAt: Date.now(),
      ticket: tickets,
      userId: this.user?.id,
    };

    this.http
      .post<UserOrder>('http://localhost:3000/orders', reqBody)
      .subscribe((response) => {
        this.router.navigate([`/successpage/${response.id}`]);
      });
  }
}
