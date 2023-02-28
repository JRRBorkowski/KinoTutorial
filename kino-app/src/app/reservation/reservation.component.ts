import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies/movies.service';
import { Movie, Showing } from '../types';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  movieId: number;
  showHour: string | null;
  showing?: Showing;
  selectedMovie?: Movie;
  selectedSeats?: string[];
  reservedSeats?: string[];
  columns: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  rows = 8;

  isSeatReserved(column: string, row: number) {
    return this.reservedSeats?.some(seat => seat === `${column}${row}`);
  }

  isSeatSelected(column: string, row: number) {
    return this.reservationService.selectedSeats.some(seat => seat === `${column}${row}`);
  }

  checkout?: string[]

  constructor(private route: ActivatedRoute,
    public reservationService: ReservationService,
    private moviesService: MoviesService) {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.showHour = this.route.snapshot.paramMap.get('hour');
    this.moviesService.getMovie(this.movieId).subscribe(movie => {
      this.moviesService.addSubjectMovie(movie);
      this.selectedMovie = this.moviesService.selectMovie();
    });
    this.moviesService.getShowing(this.movieId).subscribe(showings => {
      //zawężyć do dnia i godziny
      const targetShow = showings.find(show => show.hour === this.showHour);
      if (targetShow) {
        this.moviesService.addSubjectShow(targetShow);
        this.showing = this.moviesService.getSelectedShowing();
        this.reservedSeats = this.showing.reservedSeats;
      }
    });
  }

  changeCheckout(price: string) {
    return this.checkout?.push(price)
  }

  ngOnInit(): void {
    this.reservationService.createSeats(this.rows);
  }

}