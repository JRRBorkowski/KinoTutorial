import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { Movie, Showing, UserOrderSeat, Price } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  selectedTickets: UserOrderSeat[] = [];
  selectedReservationMovie?: Movie;
  selectedSeats: string[] = [];
  rows?: number[];
  seatSelectionLimit = 10;
  selectedDay = 0;

  clearReservationData() {
    this.selectedTickets = [];
    this.selectedSeats = [];
    this.rows = [];
  }

  selectSeat(column: string, row: number, showing: Showing): void {
    const seat = `${column}${row}`;
    if (this.selectedSeats.includes(seat)) {
      const seatIndex = this.selectedSeats.indexOf(seat);
      this.selectedSeats.splice(seatIndex, 1);
      this.removeSeatTicket(seat);
    } else {
      if (this.selectedSeats.length >= this.seatSelectionLimit) {
        return;
      }
      this.selectedSeats.push(seat);
      this.addDefaultSeat(seat, showing.priceList);
      this.reserveSeats(showing.id).subscribe();
    }
  }

  removeSeatTicket(seat: string){
    this.setSelectedTickets(this.selectedTickets?.filter(ticket => ticket.positon !== seat));
  }

  changeSeatTicketPrice(seat: string, priceToSet: Price){
    const newTicketArray = this.selectedTickets.map(ticket => ticket.positon === seat ? {positon: seat, type: priceToSet.type, price: priceToSet.price} : ticket);
    this.setSelectedTickets(newTicketArray);
  }

  addDefaultSeat(positon: string, priceList: Price[]) {
    const defaultPrice = priceList[0];
    this.selectedTickets?.push({positon, type: defaultPrice.type, price: defaultPrice.price });
  }

  getTotalTicketPrice() {
    return this.selectedTickets.reduce((acc, ticket) => acc + ticket.price, 0)
  }

  setSelectedTickets(tickets: UserOrderSeat[]) {
    this.selectedTickets = tickets;
  }

  selectDay(dayIndex: number): void {
    this.selectedDay = dayIndex;
  }

  selectReservationMovie(movie: Movie) {
    this.selectedReservationMovie = movie;
  }

  createSeats(row: number) {
    this.rows = [];
    for (let j = 1; j <= row; j++) {
      this.rows.push(j);
    }
  }

  reserveSeats(showingId: number) {
    return this.http
      .get<Showing>(`http://localhost:3000/showing/${showingId}`)
      .pipe(
        switchMap((result) => {
          const reservedSeats = Array.from(
            new Set<string>([...result.reservedSeats, ...this.selectedSeats])
          );
          return this.http.patch<Showing>(
            `http://localhost:3000/showing/${showingId}`,
            { reservedSeats }
          );
        })
      );
  }

  constructor(private http: HttpClient) {}
}
