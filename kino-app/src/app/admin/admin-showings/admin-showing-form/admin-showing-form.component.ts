import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators, FormControl } from '@angular/forms';
import { MoviesService } from 'src/app/movies/movies.service';
import { Movie } from 'src/app/types';
import { AdminPanelService } from '../../admin.service';

@Component({
  selector: 'app-admin-showing-form',
  templateUrl: './admin-showing-form.component.html',
  styleUrls: ['./admin-showing-form.component.scss']
})
export class AdminShowingFormComponent {

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  movies$ = this.movieService.moviesList$;
  screens$ = this.movieService.getAllScreens();
  
  ticketTypes = [
    {type: 'Normal',
    price: 20},
    {type: 'Reduced',
    price: 10}, 
    {type: 'Voucher',
    price: 15
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

  showings$ = this.movieService.getShowing(this.selectedMovie.id)
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
      priceList: this.builder.array([
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

  //TODO: convert hours to minutes for both
  checkShowingHour() {
    this.showings$.subscribe((response) => {
      response.forEach((show) => {
        if (show.hour > this.hourCtrl.value) {
          return true
        } else {
          return false
        }
      })
    })
  }


  addPriceListItem() {
    if (this.showingForm.controls.priceList.length === 3) {
      return
    }
    this.showingForm.controls.priceList.push(this.createPriceListForm());
  }

  removePriceListItem(index: number) {
    if (this.showingForm.controls.priceList.length === 1) {
      return
    }
    this.showingForm.controls.priceList.removeAt(index);
  }

  submitShowingForm() {
    this.showingForm.markAllAsTouched()
    if (this.showingForm.invalid) {
      return console.log("ups")
    }
    const showingData = this.showingForm.getRawValue()
    console.log(showingData)
    this.adminService.createShowing(showingData);
  }


  constructor (
    private movieService: MoviesService,
    private adminService: AdminPanelService,
    private builder : NonNullableFormBuilder,
  ) {
    this.movieService.getMoviesFromId()
  }

}
