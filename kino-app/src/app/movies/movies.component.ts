import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, map } from 'rxjs';
import { Movie } from '../types';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  availableMovies$: Observable<Movie[]>;

  weekNumber = 0;

  week: Date[] = [];

  //todo set initial date
  selectedDay = new Date();

  selectedDayDate = `${this.selectedDay.getDate()}/${
    this.selectedDay.getMonth() + 1
  }/${this.selectedDay.getFullYear()}`;

  private subscription = new Subscription();

  constructor(private moviesService: MoviesService) {
    this.availableMovies$ = this.getAvailableMovies();
  }

  ngOnInit(): void {
    this.moviesService.getMoviesFromId();
    this.getSchedule(0);
    //todo set initial date
    this.selectDay(new Date());
  }

  getAvailableMovies() {
    return this.moviesService.moviesList$.pipe(
      map((moviesArray) =>
        moviesArray.filter((movie) => {
          return movie.dateIds.includes(this.selectedDay?.getDay());
        })
      )
    );
  }

  getSchedule(dayOffset: number) {
    this.week = [];
    //todo set initial date
    const date = new Date();
    const currentFirstDayOfWeek = this.getFirstDayOfWeek(date);
    for (let i = 0; i < 7; i++) {
      const nextWeek = new Date(
        currentFirstDayOfWeek.getFullYear(),
        currentFirstDayOfWeek.getMonth(),
        currentFirstDayOfWeek.getDate() + (i + dayOffset)
      );
      this.week.push(nextWeek);
    }
  }

  getFirstDayOfWeek(dateObject: Date) {
    const currentDayOfWeek = dateObject.getDay();
    const firstDayOfWeek = new Date(dateObject),
      diff = currentDayOfWeek >= 0 ? currentDayOfWeek : 6 - currentDayOfWeek;

    firstDayOfWeek.setDate(dateObject.getDate() - diff);
    firstDayOfWeek.setHours(0, 0, 0, 0);

    return firstDayOfWeek;
  }

  changeWeek(weekDelta: number) {
    this.weekNumber = this.weekNumber + weekDelta;
    this.getSchedule(this.weekNumber);
  }

  selectDay(newDay: Date) {
    this.selectedDay = newDay;
    this.selectedDayDate = `${newDay.getDate()}/${
      newDay.getMonth() + 1
    }/${newDay.getFullYear()}`;
    this.availableMovies$ = this.getAvailableMovies();
  }

  onMovieSelection() {
    this.moviesService.selectMovie();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
