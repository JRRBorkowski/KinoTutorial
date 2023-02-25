import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription} from 'rxjs';
import { MoviesFromDb, Showing, User } from '../../types';
import { MoviesService } from '../movies.service';
import { WatchlistService } from '../watchlist/watchlist.service';

@Component({
  selector: 'app-single-movie[movie]',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit, OnDestroy {

  @Input() movie: MoviesFromDb = {} as MoviesFromDb;

  user$: Observable<User | undefined>;
  userId: number | undefined = undefined;

  showings?: Showing[] = []

  private movieSubscription = new Subscription();

  selectedMovie?: MoviesFromDb;

  scores?: number[] = this.selectedMovie?.score

  clickedMore = false;
  tellMeMore() {
    !this.clickedMore ? this.clickedMore = true : this.clickedMore = false;
  }

  addToWatchlist(id : number, movie : MoviesFromDb) {
    if (this.userId && this.selectedMovie) {
      this.watchlistService.addWatchlist(id, movie)
    }
  }

  getScore(scores: number[]) {
    const score = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(score);
  }

  handleSelectedMovie(showing: Showing) {
    this.moviesService.addSubjectMovie(this.movie);
    this.moviesService.addSubjectShow(showing);
  }

  getShowings() {
    const showingSub = this.moviesService
      .getShowing(this.movie.id)
      .subscribe(showing => {
        this.showings = showing;
      });

    this.movieSubscription.add(showingSub);
  }

  constructor (
    private moviesService: MoviesService,
    private watchlistService: WatchlistService,
    private store : Store<{ userData: { user?: User } }>
  ) {
    this.user$ = this.store.select(state => state.userData.user);
    this.user$.subscribe(userData => {
      this.userId = userData?.id
    });
  }

  
  ngOnInit(): void {
    this.getShowings();
  }

  
  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }
}
