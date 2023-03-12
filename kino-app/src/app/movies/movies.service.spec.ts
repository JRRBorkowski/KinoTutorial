import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';

describe('MoviesService', async () => {
  //arrange

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MoviesService],
    });
  });

  it('initial state', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(MoviesService);

    state.moviesList$.subscribe((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  //act

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

  //assert

  expect(window.alert).toHaveBeenCalledWith('Error');

  // this.moviesService.success()
});
