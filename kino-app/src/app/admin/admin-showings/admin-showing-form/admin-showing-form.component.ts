import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/movies/movies.service';
import { Movie } from 'src/app/types';
import { AdminPanelService } from '../../admin.service';

@Component({
  selector: 'app-admin-showing-form',
  templateUrl: './admin-showing-form.component.html',
  styleUrls: ['./admin-showing-form.component.scss']
})
export class AdminShowingFormComponent {

  movies$ = this.movieService.moviesList$;
  screens$ = this.movieService.getAllScreens();
  
  ticketTypes = [
    {type: 'Kid',
    price: 20},
    {type: 'Adult',
    price: 30}, 
    {type: 'Special',
    price: 25
    }];

  selectedMovie!: Movie;
  selectedMovieId!: number;
  selectedScreen!: string;

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
      dateId: this.builder.control('', {
        validators: [Validators.required],
      }),
      screen: this.builder.control('', {
        validators: [Validators.required],
      }),
      prices: this.builder.array([
        this.createPriceListForm()
      ]),
      reservedSeats: this.builder.control([''])
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

  get dateIdCtrl() {
    return this.showingForm.controls.dateId;
  }

  get screenCtrl() {
    return this.showingForm.controls.screen;
  }


  addPriceListItem() {
    if (this.showingForm.controls.prices.length === 3) {
      return
    }
    this.showingForm.controls.prices.push(this.createPriceListForm());
  }

  removePriceListItem(index: number) {
    if (this.showingForm.controls.prices.length === 1) {
      return
    }
    this.showingForm.controls.prices.removeAt(index);
  }

  submitShowingForm() {
    this.showingForm.markAllAsTouched()
    if (this.showingForm.invalid) {
      return console.log("ups")
    }
    const showingData = this.showingForm.getRawValue()
    console.log(showingData)
    // this.adminService.createShowing(showingData);
  }


  constructor (
    private movieService: MoviesService,
    private adminService: AdminPanelService,
    private builder : NonNullableFormBuilder,
  ) {
    this.movieService.getMoviesFromId()
  }

}
