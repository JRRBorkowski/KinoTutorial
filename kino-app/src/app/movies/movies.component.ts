import { Component, OnInit } from '@angular/core';
import { Movies } from '../mock-movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies = Movies;

      schedule(day : number) {
      let date = new Date();
      var nextweek = new Date(date.getFullYear(), date.getMonth(), date.getDate()+day)
        return `${nextweek.getDate()}/${nextweek.getMonth()}`;
    }

  constructor() { }

  ngOnInit(): void {
  }
}