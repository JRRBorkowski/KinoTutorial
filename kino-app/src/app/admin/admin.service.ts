import { Injectable } from '@angular/core';
import { Movie } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminPanelService {

  private url = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ){}

  createMovie(movie: Movie) {
    return this.http.post(`${this.url}/movies`, movie);
  }

}
