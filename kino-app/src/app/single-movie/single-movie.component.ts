import { Component, Input, OnInit } from '@angular/core';
import { Observable, ObservedValueOf, Subscription} from 'rxjs';
import { Movie, MoviesFromDb, Showing } from '../types';
import { MoviesComponent } from '../movies/movies.component';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-single-movie[movie]',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {

  @Input() movie: MoviesFromDb = {} as MoviesFromDb;

  showings?: Showing[] = []

  private movieSubscription = new Subscription();

  selectedMovie?: MoviesFromDb;

  clickedMore : boolean = false;
  tellMeMore() {
    !this.clickedMore ? this.clickedMore = true : this.clickedMore = false;
  }

  getScore(scores: number[]) {
    let score = scores.reduce((a, b) => a + b, 0) / scores.length;
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
    private moviesService: MoviesService
  ) {}

  
  ngOnInit(): void {
    this.getShowings()
  }

  
  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }
}
