import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getUser(userId: number) {
    return this.http.get<User>(this.apiUrl + `/users/${userId}`);
  }
}