import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription} from 'rxjs';
import { Movie, Showing, User } from '../../types';
import { MoviesService } from '../movies.service';
import { WatchlistService } from '../watchlist/watchlist.service';

@Component({
  selector: 'app-single-movie[movie]',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit, OnDestroy {

  @Input() movie: Movie = {} as Movie;

  userWatchlist$: Observable<Movie[] | undefined>;
  user$: Observable<User | undefined>;
  userId: number | undefined = undefined;

  showings?: Showing[] = [];

  private movieSubscription = new Subscription();

  selectedMovie?: Movie;

  scores?: number[] = this.selectedMovie?.score;

  clickedMore = false;
  tellMeMore() {
    !this.clickedMore ? this.clickedMore = true : this.clickedMore = false;
  }

  addToWatchlist(id : number, movie : Movie) {
    if (id && movie) {
      this.watchlistService.addToWatchlist(id, movie);
    }
  }

  canAddToWatchlist(userWatchlist?: Movie[] | null) {
    if (!userWatchlist) {
      return true
    }
    if ( userWatchlist.some(watchlistMovie => {
        return watchlistMovie.id === this.movie.id;
      }) ) {
        return false;
    } 
    return true
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
      this.userId = userData?.id;
      this.watchlistService.getWatchlistMovies(this.userId);
    })
    this.userWatchlist$ = this.watchlistService.userWatchlist$
  }

  
  ngOnInit(): void {
    this.getShowings();
  }

  
  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }
}
