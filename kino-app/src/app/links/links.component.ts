import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from '../types';
import { resetLoginData } from '../user-data/user-data.actions';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnDestroy {

  isLogged = false;

  user : string | null = null;

  private subscription = new Subscription();

  checkLoginStatus() {
    const login = this.loginService.isUserLoggedIn$.subscribe((response) => {
      this.isLogged = response
    })
    this.subscription.add(login)
  }

  checkUser() {
    this.user = localStorage.getItem('loginData')
    if (this.user !== null) {
      return this.isLogged = true
    }
    return this.isLogged = false
  }

  logoutUser() {
    this.store.dispatch(resetLoginData())
    this.router.navigate(['']);
  }

  constructor(
    private router: Router,
    private loginService : LoginService,
    private store: Store<{user?: User}>
  ) {}

  ngOnInit(): void {
    this.checkUser()
    this.checkLoginStatus()
    console.log(this.isLogged)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  

}
