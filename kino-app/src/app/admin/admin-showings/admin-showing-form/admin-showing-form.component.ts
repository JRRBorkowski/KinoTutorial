import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/movies/movies.service';
import { Movie } from 'src/app/types';
import { AdminPanelService } from '../../admin.service';

@Component({
  selector: 'app-admin-showing-form',
  templateUrl: './admin-showing-form.component.html',
  styleUrls: ['./admin-showing-form.component.scss'],
})
export class AdminShowingFormComponent {
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  movies$ = this.movieService.moviesList$;
  screens$ = this.movieService.getAllScreens();

  ticketTypes = [
    { type: 'Normal', price: 20 },
    { type: 'Reduced', price: 10 },
    { type: 'Voucher', price: 15 },
  ];

  selectedMovie!: Movie;
  selectedMovieId!: number;
  selectedScreen!: string;
  isInvalid = false;

  //
  today = new Date();
  minimumDate = new Date();
  first = this.today.getDate() - this.today.getDay() + 1;
  firstDate = new Date(this.today.setDate(this.first));
  lastDate = new Date(this.today.setDate(this.firstDate.getDate() + 7));

  showingForm = this.createForm();

  createForm() {
    return this.builder.group({
      id: this.builder.control(0),
      movieId: this.builder.control(0, {
        validators: [Validators.required],
      }),
      hour: this.builder.control('', {
        validators: [Validators.required],
      }),
      screen: this.builder.control('', {
        validators: [Validators.required],
      }),
      priceList: this.builder.array([this.createPriceListForm()]),
      reservedSeats: this.builder.control(['']),
    });
  }

  createPriceListForm() {
    return this.builder.group({
      type: this.builder.control('', {
        validators: [Validators.required],
      }),
      price: this.builder.control(0, {
        validators: [
          Validators.required,
          Validators.min(10),
          Validators.max(50),
        ],
      }),
    });
  }

  get movieIdCtrl() {
    return this.showingForm.controls.movieId;
  }

  get hourCtrl() {
    return this.showingForm.controls.hour;
  }

  get screenCtrl() {
    return this.showingForm.controls.screen;
  }

  addPriceListItem() {
    if (this.showingForm.controls.priceList.length === 3) {
      return;
    }
    this.showingForm.controls.priceList.push(this.createPriceListForm());
  }

  removePriceListItem(index: number) {
    if (this.showingForm.controls.priceList.length === 1) {
      return;
    }
    this.showingForm.controls.priceList.removeAt(index);
  }

  isOverTimeDifferenceConstraint(existingShowing: string, newShowing: string) {
    const existingShowingTimeArr = existingShowing.split(':');
    const newShowingTimeArr = newShowing.split(':');

    const existingShowingTimeDate = new Date();
    existingShowingTimeDate.setHours(
      Number(existingShowingTimeArr[0]),
      Number(existingShowingTimeArr[1]),
      0,
      0
    );

    const newShowingTimeDate = new Date();
    newShowingTimeDate.setHours(
      Number(newShowingTimeArr[0]),
      Number(newShowingTimeArr[1]),
      0,
      0
    );

    const timeDifferenceInMs =
      existingShowingTimeDate.getTime() - newShowingTimeDate.getTime();

    const limitInMs = 2 * 60 * 60 * 1000;

    return limitInMs <= Math.abs(timeDifferenceInMs);
  }

  submitShowingForm() {
    this.showingForm.markAllAsTouched();

    if (this.showingForm.invalid) {
      return console.log('ups');
    }

    this.adminService
      .getShowingForScreen(this.screenCtrl.value)
      .subscribe((showings) => {
        this.isInvalid = showings.some((singleShowing) => {
          return !this.isOverTimeDifferenceConstraint(
            singleShowing.hour,
            this.hourCtrl.value
          );
        });
        if (!this.isInvalid) {
          const showingData = this.showingForm.getRawValue();
          this.adminService
            .createShowing(showingData)
            .subscribe(() => this.router.navigate(['admin']));
        }
      });
  }

  constructor(
    private movieService: MoviesService,
    private adminService: AdminPanelService,
    private builder: NonNullableFormBuilder,
    private router: Router
  ) {
    this.movieService.getMoviesFromId();
  }
}
