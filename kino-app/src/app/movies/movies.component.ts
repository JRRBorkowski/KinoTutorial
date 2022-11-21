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
  

  week: string[] = [];

  getSchedule(day : number) {
    let date = new Date();
    for (let i = 0; i < day; i++){
      let nextweek = new Date(date.getFullYear(), date.getMonth(), date.getDate()+i);
      this.week.push(`${nextweek.getDate()}/${nextweek.getMonth()}`);
    }
  }
  getScore(scores: number[]) {
    let score = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(score);
  }
  getMovies():void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies)
  }
  selectMovie() {
    
  }



  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies();
    this.getSchedule(7);
  }
}