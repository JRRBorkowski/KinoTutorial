import { Injectable } from '@angular/core';
import { Movie } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  selectedReservationMovie?: Movie;
  selectedSeats: string[] = [];
  rows?: number[];
  seatSelectionLimit = 10;
  selectedDay = 0;

  checkout?: number;

  selectSeat(column : string, row: number) : void {
    const seat = `${column}${row}`;
    if (this.selectedSeats.includes(seat)) {
      const seatIndex= this.selectedSeats.indexOf(seat)
      this.selectedSeats.splice(seatIndex, 1)
    } else {
      if (this.selectedSeats.length >= this.seatSelectionLimit) {
        return;
      }
    this.selectedSeats.push(seat)
    }
  }

  selectDay(dayIndex: number) : void {
    this.selectedDay = dayIndex;
  }

  selectReservationMovie(movie: Movie) {
    this.selectedReservationMovie = movie
  }

  createSeats(row:number) {
    this.rows = [];
    for (let j = 1; j <= row; j++) {
      this.rows.push(j)
    }
  }

}
