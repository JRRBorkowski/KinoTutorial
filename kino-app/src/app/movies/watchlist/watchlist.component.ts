import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { User } from 'src/app/types';
import { WatchlistService } from './watchlist.service';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit, OnDestroy {
  user$: Observable<User | undefined>;
  userId: number | undefined = undefined;

  private subscription = new Subscription()

  // zmienić mockowany userId na store, nie dawać opcji wejścia jak niezalogowany

  constructor(
    private service : WatchlistService,
    private store : Store<{ userData: { user?: User } }>
  ) {
    this.user$ = this.store.select(state => state.userData.user);
    this.user$.subscribe(userData => {
      this.userId = userData?.id
    });
  }

  userWatchlist$ = this.service.userWatchlist$



  remove(id : number | undefined, movie : number) {
    if (id) {
      this.service.removeFromWatchlist(id, movie)
    } 
  }
  ngOnInit(): void {
    this.service.getWatchlistMovies(this.userId)
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
