import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { ReservationService } from '../reservation.service';
import { MoviesService } from 'src/app/movies/movies.service';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'
import { Prices } from 'src/app/types';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

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
    firstName: this.builder.control('', {
      validators: Validators.required
    }),
    surname: this.builder.control('', {
      validators: Validators.required
    }),
    phone: this.builder.control('', {
      validators: [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]
    }),
    email: this.builder.control('', {
      validators: [Validators.required, Validators.email]
    }),
    confirmEmail: this.builder.control('', {
      validators: [Validators.required, Validators.email]
    })
  }, {
    validators: customValidator('email', 'confirmEmail')
  });


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
    private builder: NonNullableFormBuilder,
    public reservationService: ReservationService,
    public moviesService: MoviesService,
    private router: Router) {
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
  }

}
