import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Screen } from '../types';
import { MoviesService } from '../movies/movies.service';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  selectedMovie = this.moviesService.selectMovie()
  selected = this.moviesService.selectedSeats;



  columns: string[] = ['A','B','C','D','E','F','G','H'];
  rows: number = 8;

  showing = this.moviesService.getSelectedShowing()
  screen = this.moviesService.getScreen(this.showing.screen)

  checkout?: string

  constructor(private route: ActivatedRoute, 
    public reservationService: ReservationService, 
    private moviesService: MoviesService) {}

  changeCheckout(price: string) {
    this.checkout = price
  }

  getStatus(seatPos: string) {
    if (this.showing.reservedSeats.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if (this.showing.reservedSeats.indexOf(seatPos) !== -1) {
      return 'selected';
    }
    return 'freeSeat';
  }

  ngOnInit(): void {
    this.reservationService.createSeats(this.rows)
    console.log(this.showing.screen)
    console.log(this.screen)
  }

}