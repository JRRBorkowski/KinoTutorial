import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Movie } from '../movie';
import { MoviesComponent } from '../movies/movies.component';
import { MoviesService } from '../movies/movies.service';

@Component({
  selector: 'app-single-movie[movie]',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {

  constructor() { }

  @Input() movie!: Observable<Movie>

  ngOnInit(): void {
  }

}
