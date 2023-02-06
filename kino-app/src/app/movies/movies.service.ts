import { Injectable } from '@angular/core';
import { Movies } from '../mock-movies';
import { Movie, Showing, Prices, MoviesFromDb } from '../movie';
import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movieUrl = 'http://localhost:3000/movies';

  selectedDay: string = '';

  showing: Showing[] = []

  private selectedMovie = new ReplaySubject<MoviesFromDb>(1);
  private selectedShowing = new ReplaySubject<Showing>(1);

  constructor( private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    const movies = of(Movies);
    return movies
  }

  getMoviesFromId() {
    return this.http.get<MoviesFromDb[]>(this.movieUrl)
  } 

  selectMovie() : MoviesFromDb {
    let movie = {
      id: 0,
      image: '',
      title: '',
      genre: '',
      length: '',
      ageRest: '',
      description: '',
      score: [0],
      director: '',
      actors: [''],
      boxOff: 0,
      premiere: false,
    }
    this.selectedMovie.subscribe( movieResponse => {
      movie = movieResponse;
    });
    return movie;
  }

  getScore(scores: number[]) {
    let score = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(score);
  }

  getShowing(id: number) {
    return this.http.get<Showing[]>(`${this.movieUrl}/${id}/showing`);
  }
  
  getSelectedShowing(): Showing {
    let showing = {
      filmId: 0,
      hour: '',
      screen: '',
      id: 0,
      reservedSeats: [''],
      prices: [
        {
          type: '',
          price: 0,
        },
      ],
    };
    this.selectedShowing.subscribe((response) => {
      showing = response;
    });
    return showing;
  }

  addSubjectMovie(movie: MoviesFromDb) {
    this.selectedMovie.next(movie);
  }
  addSubjectShow(showing: Showing) {
    this.selectedShowing.next(showing);
  }
}
