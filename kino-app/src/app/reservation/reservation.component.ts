import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  selectedMovie?: string | null;

  columns: string[] = ['A','B','C','D','E','F','G','H'];
  rows: number = 8;

  checkout?: string
  
  // seats: string[] = this.reservationService.seats

  selectedSeats: string[] = []

  constructor(private route: ActivatedRoute, public reservationService: ReservationService) {}

  changeCheckout(price: string) {
    this.checkout = price
  }

  selectSeat(seat : string) : void {
    if (this.selectedSeats.includes(seat)) {
      const seatIndex= this.selectedSeats.indexOf(seat)
      this.selectedSeats.splice(seatIndex, 1)
    } else {
    this.selectedSeats.push(seat)
    }
  }

  ngOnInit(): void {
    this.selectedMovie = this.route.snapshot.paramMap.get("id")

    this.reservationService.createSeats(this.rows, this.columns)
  }
}
