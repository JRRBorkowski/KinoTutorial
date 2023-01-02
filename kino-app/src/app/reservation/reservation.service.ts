import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  seats: string[] = [];
  selectedSeats: string[] = [];
  rows: number[] = [];

  checkout?: number;

  selectSeat(column : string, row: number) : void {
    const seat = `${column}${row}`;
    if (this.selectedSeats.includes(seat)) {
      const seatIndex= this.selectedSeats.indexOf(seat)
      this.selectedSeats.splice(seatIndex, 1)
    } else {
    this.selectedSeats.push(seat)
    }
  }

  createSeats(row : number, col : string[]) {
    for (let i = 0; i < col.length; i++) {
      for (let j = 1; j <= row; j++) {
        this.seats.push(`${col[i]}${j}`)
      }
    }
    return this.seats
  }

  createSeats2(row:number) {
    for (let j = 1; j <= row; j++) {
      this.rows.push(j)
    }
  }

  constructor() { }
}
