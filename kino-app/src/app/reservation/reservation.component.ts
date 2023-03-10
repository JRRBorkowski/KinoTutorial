import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MoviesService } from '../movies/movies.service';
import { Movie, Showing } from '../movies/movies.types';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
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
  dayIndex: number;

  isSeatReserved(column: string, row: number) {
    return this.reservedSeats?.some((seat) => seat === `${column}${row}`);
  }

  handleReservation() {
    if (this.showing) {
      this.reservationService.reserveSeats(this.showing?.id).subscribe();
      this.router.navigate(['form'], { relativeTo: this.route });
    }
  }

  handleTicketPriceClick(event: MatButtonToggleChange, seat: string) {
    this.reservationService.changeSeatTicketPrice(seat, event.value);
  }

  isSeatSelected(column: string, row: number) {
    return this.reservationService.selectedSeats.some(
      (seat) => seat === `${column}${row}`
    );
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public reservationService: ReservationService,
    private moviesService: MoviesService
  ) {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.showHour = this.route.snapshot.paramMap.get('hour');
    this.dayIndex = Number(this.route.snapshot.paramMap.get('dayIndex'));
  }

  ngOnInit(): void {
    this.reservationService.clearReservationData();
    this.reservationService.createSeats(this.rows);

    this.reservationService.selectDay(this.dayIndex);

    this.moviesService.getMovie(this.movieId).subscribe((movie) => {
      this.moviesService.addSubjectMovie(movie);
      this.reservationService.selectReservationMovie(movie);
      this.selectedMovie = this.reservationService.selectedReservationMovie;

      this.moviesService.getShowing(this.movieId).subscribe((showings) => {
        const targetShow = showings.find(
          (show) =>
            show.hour === this.showHour &&
            this.selectedMovie?.dateIds.includes(this.dayIndex)
        );
        if (targetShow) {
          this.moviesService.addSubjectShow(targetShow);
          this.showing = this.moviesService.getSelectedShowing();
          this.reservedSeats = this.showing.reservedSeats;
        }
      });
    });
  }
}
