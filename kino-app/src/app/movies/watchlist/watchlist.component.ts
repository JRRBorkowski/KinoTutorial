import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WatchlistService } from './watchlist.service';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  userId = 1;
  private subscription = new Subscription()

  constructor(
    private service : WatchlistService,
    private store : Store
  ) {}

  userWatchlist$ = this.service.userWatchlist$

  ngOnInit(): void {
    this.service.getWishlistMovies(this.userId)
  }
}
