import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  newMovieForm = this.builder.group({
    title: this.builder.control('', {
      validators: Validators.required
    }),
    genre: this.builder.control('', {
      validators: Validators.required
    }),
    length: this.builder.control('', {
      validators: Validators.required
    }),
    description: this.builder.control('', {
      validators: Validators.required
    }),
    score: this.builder.control([]),
    director: this.builder.control('', {
      validators: Validators.required
    }),
    actors: this.builder.group(
      this.builder.control(''),
       {
      validators: Validators.required
    }),
    boxOff: this.builder.control(0, {
      validators: Validators.required
    }),
    premiere: this.builder.control(false, {
        validators: [Validators.required]
    })
  })

  submitForm() {
    this.newMovieForm.markAllAsTouched();

    if (this.newMovieForm.invalid) {
      return;
    }

    console.log(this.newMovieForm.value);
  }

  constructor(
    private builder: NonNullableFormBuilder
  ) {

  }
}
