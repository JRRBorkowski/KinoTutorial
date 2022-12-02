import { Injectable } from '@angular/core';
import { Movies } from '../mock-movies';
import { Movie } from '../movie';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  selectedMovie: string = '';

  constructor() { }

  getMovies(): Observable<Movie[]> {
    const movies = of(Movies);
    return movies
  }

  selectMovie(newMovie: string) {
    this.selectedMovie = newMovie;
  }

  getSelectedMovie() {
    return this.selectedMovie;
  }

  getScore(scores: number[]) {
    let score = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(score);
  }
}
