import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WatchlistService } from './watchlist.service';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit, OnDestroy {
  userId = 1;
  private subscription = new Subscription()

  // zmienić mockowany userId na store

  constructor(
    private service : WatchlistService,
    // private store : Store jeszcze nie wiem na co on tu jest ale będzie sobie brał userId
  ) {}

  userWatchlist$ = this.service.userWatchlist$

  remove(id : number, movie : number) { 
    this.service.removeFromWatchlist(id, movie)
  }
  ngOnInit(): void {
    this.service.getWatchlistMovies(this.userId)
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
