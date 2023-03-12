import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Showing } from '../movies/movies.types';

import { ReservationService } from './reservation.service';

const column = 'A';
const row = 1;
const showing: Showing = {
  id: 0,
  hour: '12:30',
  screen: 'B',
  reservedSeats: [],
  priceList: [{ type: 'type', price: 0 }],
  movieId: 0,
};

describe('ReservationService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ReservationService],
    });
  });

  it('clear reservation data', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(ReservationService);

    state.clearReservationData();

    expect(state.selectedSeats).toEqual([]);
  });
});
