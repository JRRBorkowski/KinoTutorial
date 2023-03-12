import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { WatchlistService } from './watchlist.service';

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

const userId = 0;

describe('WatchlistService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [WatchlistService],
    });
  });

  it('initial state', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(WatchlistService);

    state.userWatchlist$.subscribe((result) => {
      expect(result).toEqual([]);
      done;
    });
  });

  it('get user', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(WatchlistService);

    state.getUser(0);

    state.userWatchlist$.subscribe((result) => {
      expect(result).toEqual([]);
      done;
    });
  });

  it('add movie to watchlist', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(WatchlistService);

    state.addToWatchlist(userId, movie);

    state.userWatchlist$.subscribe((result) => {
      expect(result).toEqual([movie]);
      done;
    });
  });

  it('remove movie from watchlist', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(WatchlistService);

    state.removeFromWatchlist(userId, movie.id);

    state.userWatchlist$.subscribe((result) => {
      expect(result).toEqual([]);
      done;
    });
  });
});
