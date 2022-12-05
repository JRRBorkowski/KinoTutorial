import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  reservationForm = this.builder.group({
    firstName: this.builder.control(''),
    surname: this.builder.control(''),
    phone: this.builder.control(''),
    email: this.builder.control('')
  })

  constructor(private builder: FormBuilder) {
    this.reservationForm.valueChanges.subscribe(console.log)

  }

  submitForm() {
    console.log(this.reservationForm.value);
  }

  ngOnInit(): void {
  }

}
