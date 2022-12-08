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

  constructor(private route: ActivatedRoute, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.selectedMovie = this.route.snapshot.paramMap.get("id")
    this.reservationService.createSeats(this.rows, this.columns)
  }
}
