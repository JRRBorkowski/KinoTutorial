import { Injectable } from '@angular/core';
import { Movie, Showing } from '../movies/movies.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createMovie(movie: Movie) {
    return this.http.post(`${this.url}/movies`, movie);
  }

  createShowing(showing: Showing) {
    return this.http.post(`${this.url}/showing`, showing);
  }

  getShowingForScreen(screen: string) {
    return this.http.get<Showing[]>(`${this.url}/showing?screen=${screen}`);
  }
}
