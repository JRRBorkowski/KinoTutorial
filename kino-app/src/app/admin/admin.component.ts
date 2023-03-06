import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../movies/movies.service';
import { Movie } from '../types';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  // TODO: Przerobić na standalone component, dodać module

  movies: Movie[] = [];

  private movieService = inject(MoviesService);

  ngOnInit(): void {
    this.movieService.getMoviesFromId();
  }
}
