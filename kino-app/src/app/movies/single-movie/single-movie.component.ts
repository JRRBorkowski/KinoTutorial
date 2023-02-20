import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { MoviesFromDb, Showing } from '../../types';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-single-movie[movie]',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit, OnDestroy {

  @Input() movie: MoviesFromDb = {} as MoviesFromDb;

  showings?: Showing[] = []

  private movieSubscription = new Subscription();

  selectedMovie?: MoviesFromDb;

  scores?: number[] = this.selectedMovie?.score

  clickedMore = false;
  tellMeMore() {
    !this.clickedMore ? this.clickedMore = true : this.clickedMore = false;
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

  // newScore(score : number) {
  //   this.scores?.push(score)
  //   this.moviesService.addScore(this.scores, this.selectedMovie?.id)
  // }

  constructor (
    private moviesService: MoviesService
  ) {}

  
  ngOnInit(): void {
    this.getShowings();
  }

  
  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }
}
