import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  selectedMovie?: string | null;

  columns: string[] = ['A','B','C','D','E','F','G','H'];
  rows: number = 8;

  seats: string[] = []
  selectedSeats: string[] = []

  createSeats(row : number, col : string[]) {
    for (let i = 0; i < col.length; i++) {
      for (let j = 1; j <= row; j++) {
        this.seats.push(`${col[i]}${j}`)
      }
    }
  }

  // selectSeat(event : Event) {
  //   if (this.selectedSeats.includes(event.target)) {

  //   }
  //   this.selectedSeats.push(event.target : HTMLInputElement)
  // }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedMovie = this.route.snapshot.paramMap.get("id")
    this.createSeats(this.rows, this.columns)
  }

}
