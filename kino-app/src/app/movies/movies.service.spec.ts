import { jsDocComment } from '@angular/compiler';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';

describe('MoviesService', async () => {
  //arrange
  it('error', async () => {
    await TestBed.configureTestingModule({
      providers: [MoviesService],
    });

    //act

    //assert

    const service = TestBed.inject(EnvironmentInjector).get(MoviesService);
  });
});
