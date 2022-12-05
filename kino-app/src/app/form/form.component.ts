import { Component, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  reservationForm = new FormGroup({
    firstName: new FormControl(''),
    surname: new FormControl(''),
    phone: new FormControl('', {
      validators: Validators.pattern('/ \d{5} /')
    }),
    email: new FormControl('', {
      validators: Validators.email
    })
  })

  constructor(private builder: NonNullableFormBuilder) {
    this.reservationForm.valueChanges.subscribe(console.log)

  }

  submitForm() {
    console.log(this.reservationForm.value);
  }

  ngOnInit(): void {
  }

}
