import { Injectable } from '@angular/core';
import { Showing, Movie, Screen } from '../types';
import { ReplaySubject,BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private movieUrl = 'http://localhost:3000/movies';

  selectedDay = '';

  showing: Showing[] = []

  private selectedMovie = new ReplaySubject<Movie>(1);
  private selectedShowing = new ReplaySubject<Showing>(1);

  selectedSeats: string[] = [];

  screen?: Screen

  private moviesList$$ = new BehaviorSubject<Movie[]>([]);

  get moviesList$() {
    return this.moviesList$$.asObservable();
  }

  constructor( private http: HttpClient) { }

  getMoviesFromId() {
    this.http.get<Movie[]>(this.movieUrl).subscribe((movies) => {
        this.moviesList$$.next(movies);
    })
  } 

  getMovie(movieId : number) {
    return this.http.get<Movie>(`${this.movieUrl}/${movieId}`)
  }

  selectMovie(): Movie {
    let movie = {
      id: 0,
      image: '',
      title: '',
      genre: '',
      length: '',
      ageRest: '',
      description: '',
      scores: [],
      director: '',
      actors: [],
      boxOff: 0,
      premiere: false,
      dateIds: [],
    } as Movie;
    this.selectedMovie.subscribe(movieResponse => {
      movie = movieResponse;
    });
    return movie;
  }

  addScore(score : number, userId: number, movieId : number) {
    const scoreObject = {
      score: score,
      userId: userId
    };
    this.getMovie(movieId).subscribe((movie => {
        const filteredMovieScores = movie.scores.filter((movieScore) => {
          return movieScore.userId !== userId;
        })
        console.log(filteredMovieScores)
        const newScores = [...filteredMovieScores, scoreObject];
        this.http.patch<Movie>(`${this.movieUrl}/${movieId}`, {scores: [...newScores]})
          .subscribe(()=>{
            this.getMoviesFromId();
          });
        }
      )
    );
  }
  // TODO: dokończyć komponent

  getShowing(movieId: number) {
    return this.http.get<Showing[]>(`${this.movieUrl}/${movieId}/showing`);
  }
  
  getSelectedShowing(): Showing {
    let showing = {
      movieId: 0,
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

  addSubjectMovie(movie: Movie) {
    this.selectedMovie.next(movie);
  }
  addSubjectShow(showing: Showing) {
    this.selectedShowing.next(showing);
  }

  addSelectedSeat(seat: string) {
    this.selectedSeats.push(seat);
  }

  getSelectedSeats(): string[] {
    return this.selectedSeats;
  }

  deleteSelectedSeats() {
    this.selectedSeats = []
  }

  getScreen(screen : string) {
    return this.http.get<Screen[]>(`http://localhost:3000/screen?q=${screen}`)
  }

  getAllScreens() {
    return this.http.get<Screen[]>(`http://localhost:3000/screen`)
  }
}
