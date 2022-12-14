import { Component, OnInit } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'

const customValidator = (source: string, target: string) : ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceCtrl = control.get(source)
    const targetCtrl = control.get(target)

    return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value ? { mismatch: true } : null;
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

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
  })

  get reservationCtrl() {
    return this.reservationForm;
  }

  constructor(private builder: NonNullableFormBuilder) {}

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

    // handle...
    console.log(this.reservationForm.value);
  }

  ngOnInit(): void {
  }

}
