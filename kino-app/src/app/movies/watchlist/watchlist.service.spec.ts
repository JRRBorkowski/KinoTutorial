import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
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
      imports: [HttpClientTestingModule],
    });
  });

  it('initial state', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(WatchlistService);

    state.userWatchlist$.subscribe((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  it('get user', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(WatchlistService);

    state.getUser(0);

    state.userWatchlist$.subscribe((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  it('add movie to watchlist', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(WatchlistService);
    const httpController = TestBed.inject(HttpTestingController);
    const expectedUrl = 'http://localhost:3000/users/0';

    state.addToWatchlist(userId, movie);

    state.userWatchlist$.subscribe((result) => {
      expect(result).toEqual([movie]);
      done();
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush({
      userWatchlist: [],
    });

    const req2 = httpController.expectOne(expectedUrl);

    req2.flush({
      userWatchlist: [],
    });
  });

  it('doesnt add duplicate to watchlist', () => {
    const state = TestBed.inject(EnvironmentInjector).get(WatchlistService);
    const httpController = TestBed.inject(HttpTestingController);
    const expectedUrl = 'http://localhost:3000/users/0';

    state.addToWatchlist(userId, movie);

    state.userWatchlist$.subscribe(() => {
      throw new Error('this should not be executed');
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush({
      userWatchlist: [movie],
    });
  });

  it('remove movie from watchlist', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(WatchlistService);
    const httpController = TestBed.inject(HttpTestingController);
    const expectedUrl = 'http://localhost:3000/users/0';

    state.addToWatchlist(userId, movie);

    state.userWatchlist$.subscribe((result) => {
      expect(result).toEqual([movie]);
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush({
      userWatchlist: [],
    });

    const req2 = httpController.expectOne(expectedUrl);

    req2.flush({
      userWatchlist: [movie],
    });

    state.removeFromWatchlist(userId, movie.id);

    state.userWatchlist$.subscribe((result) => {
      expect(result).toEqual([]);
      done();
    });

    const req3 = httpController.expectOne(expectedUrl);

    req3.flush({
      userWatchlist: [movie],
    });

    const req4 = httpController.expectOne(expectedUrl);

    req4.flush({
      userWatchlist: [],
    });
  });
});
