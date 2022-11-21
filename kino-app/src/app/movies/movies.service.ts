import { Injectable } from '@angular/core';
import { Movies } from '../mock-movies';
import { Movie } from '../movie';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  getMovies(): Observable<Movie[]> {
    const movies = of(Movies);
    return movies
  }
  constructor() { }
}
