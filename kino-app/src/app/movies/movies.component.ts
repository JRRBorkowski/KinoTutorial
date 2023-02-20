import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie, MoviesFromDb } from '../types';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];

  moviesFromDb$ = this.moviesService.getMoviesFromId()
    
  weekNumber = 0;

  week: string[] = [];

  selectedDay = '';
  
  private subscription = new Subscription();

  getSchedule(day : number) {
    this.week = []
    const date = new Date();
    for (let i = 0; i < 7; i++){
      const nextweek = new Date(date.getFullYear(), date.getMonth(), date.getDate()+(i + day));
      this.week.push(`${nextweek.getDate()}/${nextweek.getMonth() + 1}`);
    }
  }

  getScore(scores: number[]) {
    const score = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(score);
  }
  
  changeWeek(weekDelta: number) {
    this.weekNumber = this.weekNumber + weekDelta;
    this.getSchedule(this.weekNumber)
  }

  selectDay(newDay : string) {
    this.selectedDay = newDay 
  }

  getSelectedDay() {
    // this.getMoviesFromDb()
    return this.selectedDay
  }

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    // this.getMoviesFromDb()
    this.getSchedule(this.weekNumber);
    this.selectDay(this.week[0])
    console.log()
  }

  onMovieSelection() {
    this.moviesService.selectMovie()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}