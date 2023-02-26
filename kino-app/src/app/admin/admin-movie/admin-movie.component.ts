import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AdminPanelService } from '../admin.service';

@Component({
  selector: 'app-admin-movie',
  templateUrl: './admin-movie.component.html',
  styleUrls: ['./admin-movie.component.scss'],
})
export class AdminMovieComponent {
  dayNames = [
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
  ];

  newMovieForm = this.builder.group({
    id: this.builder.control(0, {
      validators: Validators.required,
    }),
    title: this.builder.control('', {
      validators: Validators.required,
    }),
    image: this.builder.control('', {
      validators: Validators.required,
    }),
    genre: this.builder.control('', {
      validators: Validators.required,
    }),
    length: this.builder.control('', {
      validators: Validators.required,
    }),
    ageRest: this.builder.control('', {
      validators: Validators.required,
    }),
    description: this.builder.control('', {
      validators: Validators.required,
    }),
    scores: this.builder.control([
      {
        userId: 0,
        score: 10,
      },
    ]),
    director: this.builder.control('', {
      validators: Validators.required,
    }),
    actors: this.builder.control(['']),
    boxOff: this.builder.control(0, {
      validators: Validators.required,
    }),
    premiere: this.builder.control(false),
    dateIds: this.builder.control([]),
  });

  submitForm() {
    this.newMovieForm.markAllAsTouched();

    if (this.newMovieForm.invalid) {
      return;
    }

    this.service.createMovie(this.newMovieForm.getRawValue()).subscribe(() => {
      this.newMovieForm.reset();
    });
  }

  constructor(
    private builder: NonNullableFormBuilder,
    private service: AdminPanelService
  ) {}
}
