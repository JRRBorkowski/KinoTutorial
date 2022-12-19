import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  seats: string[] = []
  selectedSeats: string[] = []

  checkout?: number

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
