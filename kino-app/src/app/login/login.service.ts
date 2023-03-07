import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types';
import { Store } from '@ngrx/store';
import { resetLoginData } from '../user-data/store/user-data.actions';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isUserLoggedIn$$ = new BehaviorSubject<boolean>(false);
  private userUrl = 'http://localhost:3000/users';
  private user$$ = new BehaviorSubject<User>({} as User);
  constructor(private http: HttpClient, private store: Store) {}

  getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  get isUserLoggedIn$() {
    return this.isUserLoggedIn$$.asObservable();
  }

  get user$() {
    return this.user$$.asObservable();
  }

  setCurrentUser(user: User) {
    this.user$$.next(user);
  }

  userLogout() {
    localStorage.removeItem('loginData');
    this.store.dispatch(resetLoginData());
    this.isUserLoggedIn$$.next(false);
    this.user$$.next({} as User);
  }

  userAuthentication() {
    this.isUserLoggedIn$$.next(true);
  }
}
