import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const movie = {
  id: 0,
  image: 'image',
  title: 'title',
  genre: 'genre',
  length: 'length',
  ageRest: 'ageRest',
  description: 'description',
  scores: [],
  director: 'director',
  actors: [],
  boxOff: 0,
  premiere: false,
  dateIds: [],
};

const seat = 'A1';
const score = 10;
const userId = 0;

describe('MoviesService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MoviesService],
      imports: [HttpClientTestingModule],
    });
  });

  it('initial state', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(MoviesService);

    state.moviesList$.subscribe((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  it('add selected movie to subject', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(MoviesService);

    state.addSubjectMovie(movie);
    state.selectMovie();

    state.selectedMovie.subscribe((result) => {
      expect(result.id).toEqual(movie.id);
      done();
    });
  });

  it('add selected seat', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(MoviesService);

    state.addSelectedSeat(seat);

    expect(state.selectedSeats).toEqual([seat]);
    done();
  });

  it('add score to movie', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(MoviesService);
    const httpController = TestBed.inject(HttpTestingController);

    state.addScore(score, userId, movie.id);

    state.moviesList$.subscribe((result) => {
      expect(result[0].scores[0]).toEqual({ score, userId });
      done();
    });

    const req = httpController.expectOne('http://localhost:3000/movies/0');

    req.flush(movie);

    const req2 = httpController.expectOne('http://localhost:3000/movies/0');

    expect(req2.request.body.scores[0].score).toEqual(score);
    expect(req2.request.body.scores[0].userId).toEqual(userId);
    req2.flush(movie);

    const req3 = httpController.expectOne('http://localhost:3000/movies');

    req3.flush([{ ...movie, scores: [{ score, userId }] }]);
  });
});
