import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  seats: string[] = [];
  selectedSeats: string[] = [];

  checkout?: number;

  addSeat(seat : string) : void {
    if (this.seats.includes(seat)) {
      const seatIndex= this.seats.indexOf(seat)
      this.seats.slice(seatIndex)
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

  constructor() { }
}
