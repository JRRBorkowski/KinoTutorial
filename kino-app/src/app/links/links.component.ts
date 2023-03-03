import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, BehaviorSubject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from '../types';
import { resetLoginData } from '../user-data/store/user-data.actions';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit, OnDestroy {
  private auth$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  isLogged = false;

  user: string | null = null;

  private subscription = new Subscription();

  checkLoginStatus() {
    const login = this.loginService.isUserLoggedIn$.subscribe((response) => {
      this.isLogged = response;
    });
    this.subscription.add(login);
  }

  getAuth() {
    return this.auth$$.asObservable();
  }

  checkUser() {
    this.user = localStorage.getItem('loginData');
    if (this.user !== null) {
      this.isLogged = true;
      return this.auth$$.next({ hasAuth: true });
    }
    return (this.isLogged = false);
  }

  getMeBack() {
    this.router.navigate(['']);
  }

  logoutUser() {
    this.store.dispatch(resetLoginData());
    this.isLogged = false;
    this.auth$$.next({ hasAuth: false });
    this.router.navigate(['']);
  }

  constructor(
    private router: Router,
    private loginService: LoginService,
    private store: Store<{ user?: User }>
  ) {
    this.checkUser();
  }

  ngOnInit(): void {
    this.checkUser();
    this.checkLoginStatus();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
