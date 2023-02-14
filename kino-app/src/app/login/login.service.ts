import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../movie';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isUserLoggedIn$$ = new BehaviorSubject<boolean>(false)
  private userUrl = 'http://localhost:3000/users'
  private user$$ = new BehaviorSubject<User>({} as User)
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.userUrl)
  }

  getCurrentUser(id: number) {
    return this.http.get<User>(`${this.userUrl}/${id}`)
  }

  get isUserLoggedIn$() {
    return this.isUserLoggedIn$$.asObservable()
  }
  
  get user$() {
    return this.user$$.asObservable()
  }

  setCurrentUser(user: User) {
    this.user$$.next(user)
  }

  userLogout() {
    this.isUserLoggedIn$$.next(false)
    this.user$$.next({} as User)
  }

  userAuthentication() {
    this.isUserLoggedIn$$.next(true)
  }
}