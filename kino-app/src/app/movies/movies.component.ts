import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];

  clickedMore : boolean = false;
  tellMeMore() {
    this.clickedMore === false ? this.clickedMore = true : this.clickedMore = false;
  }
  
  weekNumber: number = 0;

  week: string[] = [];

  selectedDay: string = '';

  getSchedule(day : number) {
    this.week = []
    let date = new Date();
    for (let i = 0; i < 7; i++){
      let nextweek = new Date(date.getFullYear(), date.getMonth(), date.getDate()+(i + day));
      this.week.push(`${nextweek.getDate()}/${nextweek.getMonth() + 1}`);
    }
  }
  getScore(scores: number[]) {
    let score = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(score);
  }
  getMovies():void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies)
  }
  changeWeek(weekDelta: number) {
    this.weekNumber = this.weekNumber + weekDelta;
    this.getSchedule(this.weekNumber)
  }

  selectDay(newDay : string) {
    this.selectedDay = newDay 
  }

  getSelectedDay() {
    this.getMovies()
    return this.selectedDay
  }

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies();
    this.getSchedule(this.weekNumber);
    this.selectDay(this.week[0])
    console.log("hello")
  }

  onMovieSelection(e : Event) {
    this.moviesService.selectMovie((e.target as HTMLButtonElement).value)
  }
}