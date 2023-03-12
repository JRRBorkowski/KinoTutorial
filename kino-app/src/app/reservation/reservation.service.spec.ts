import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ReservationService],
      imports: [HttpClientTestingModule],
    });
  });

  it('clear reservation data', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(ReservationService);

    state.clearReservationData();

    expect(state.selectedSeats).toEqual([]);
    done();
  });
});
