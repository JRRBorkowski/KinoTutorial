import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, BehaviorSubject } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { User } from '../../types';
import { resetLoginData } from 'src/app/user-data/store/user-data.actions';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit, OnDestroy {
  isLogged = false;

  user: string | null = null;

  private subscription = new Subscription();

  checkLoginStatus() {
    const login = this.loginService.isUserLoggedIn$.subscribe((response) => {
      this.isLogged = response;
    });
    this.subscription.add(login);
  }

  checkUser() {
    this.user = localStorage.getItem('loginData');
    console.log(this.user);
    if (this.user !== null) {
      return this.loginService.userAuthentication();
    }
    return (this.isLogged = false);
  }

  getMeBack() {
    this.router.navigate(['']);
  }

  logoutUser() {
    this.store.dispatch(resetLoginData());
    this.loginService.userLogout();
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
