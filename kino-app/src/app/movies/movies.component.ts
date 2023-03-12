import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, map } from 'rxjs';
import { Movie } from './movies.types';
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

  selectedDay = new Date();

  selectedDayDate = `${this.selectedDay.getDate()}/${
    this.selectedDay.getMonth() + 1
  }/${this.selectedDay.getFullYear()}`;

  private subscription = new Subscription();

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.availableMovies$ = this.getAvailableMovies();
  }

  ngOnInit(): void {
    this.moviesService.getMoviesFromId();
    this.getSchedule(0);
    this.selectDay(new Date());
    this.route.params.subscribe((params) => {
      const paramsDate = params['date'] as string;
      if (paramsDate) {
        const paramsDateArray = paramsDate.split('-');
        const paramsDateDay = paramsDateArray[0];
        const paramsDateMonth = paramsDateArray[1];
        const initialDate = new Date();
        initialDate.setDate(Number(paramsDateDay));
        initialDate.setMonth(Number(paramsDateMonth) - 1);
        if (this.isInPast(initialDate)) {
          this.router.navigate(['']);
        } else {
          this.selectDay(initialDate);
        }
      }
    });
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
    const date = new Date();
    const currentFirstDayOfWeek = this.getFirstDayOfWeek(date);
    for (let i = 1; i < 8; i++) {
      const nextWeek = new Date(
        currentFirstDayOfWeek.getFullYear(),
        currentFirstDayOfWeek.getMonth(),
        currentFirstDayOfWeek.getDate() + (i + dayOffset)
      );
      this.week.push(nextWeek);
    }
  }

  isInPast(date: Date) {
    return date.getDate() < new Date().getDate();
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
    this.router.navigate([
      `movies/${this.selectedDay.getDate()}-${this.selectedDay.getMonth() + 1}`,
    ]);
  }

  onMovieSelection() {
    this.moviesService.selectMovie();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
