import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Movie } from '../movie';
import { MoviesComponent } from '../movies/movies.component';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-single-movie[movie]',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {

  @Input() movie?: Movie

  clickedMore : boolean = false;
  tellMeMore() {
    !this.clickedMore ? this.clickedMore = true : this.clickedMore = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

  getScore(scores: number[]) {
    let score = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(score);
  }
}
