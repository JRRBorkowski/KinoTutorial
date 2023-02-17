import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from '../types';

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

  constructor(
    private loginService : LoginService
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
