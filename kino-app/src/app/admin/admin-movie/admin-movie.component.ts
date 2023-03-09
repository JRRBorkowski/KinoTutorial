import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AdminPanelService } from '../admin.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-movie',
  templateUrl: './admin-movie.component.html',
  styleUrls: ['./admin-movie.component.scss'],
})
export class AdminMovieComponent {
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  dayNames = [
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
  ];

  ages = ['E', 'PG+13', 'PG+16', 'PG+18', 'R'];

  actors: string[] = [];

  newMovieForm = this.builder.group({
    id: this.builder.control(0, {
      validators: [Validators.required, this.noWhitespaceValidator],
    }),
    title: this.builder.control('', {
      validators: [Validators.required, this.noWhitespaceValidator],
    }),
    image: this.builder.control('', {
      validators: [Validators.required, this.noWhitespaceValidator],
    }),
    genre: this.builder.control('', {
      validators: [Validators.required, this.noWhitespaceValidator],
    }),
    length: this.builder.control('', {
      validators: [Validators.required, this.noWhitespaceValidator],
    }),
    ageRest: this.builder.control('', {
      validators: Validators.required,
    }),
    description: this.builder.control('', {
      validators: [Validators.required, this.noWhitespaceValidator],
    }),
    scores: this.builder.control([
      {
        userId: 0,
        score: 10,
      },
    ]),
    director: this.builder.control('', {
      validators: [Validators.required, this.noWhitespaceValidator],
    }),
    actors: this.builder.control(['']),
    boxOff: this.builder.control(0, {
      validators: Validators.required,
    }),
    premiere: this.builder.control(false),
    dateIds: this.builder.control([]),
  });

  removeActor(actor: string) {
    const index = this.actors.indexOf(actor);
    if (index >= 0) {
      this.actors.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.actors.push(value);
    }

    event.chipInput.clear();
  }

  submitForm() {
    this.newMovieForm.markAllAsTouched();

    if (this.newMovieForm.invalid) {
      return;
    }

    this.service.createMovie(this.newMovieForm.getRawValue()).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }

  constructor(
    private builder: NonNullableFormBuilder,
    private service: AdminPanelService,
    private router: Router
  ) {}
}
