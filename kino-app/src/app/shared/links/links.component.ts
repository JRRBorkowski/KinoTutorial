import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { User } from 'src/app/login/login.types';
import { setLoginData } from 'src/app/user-data/store/user-data.actions';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit, OnDestroy {
  isLogged = false;

  user: string | null = null;

  userRole?: string;

  private subscription = new Subscription();

  checkLoginStatus() {
    const login = this.loginService.isUserLoggedIn$.subscribe((response) => {
      this.isLogged = response;
    });
    this.subscription.add(login);
  }

  checkUser() {
    this.user = localStorage.getItem('loginData');
    if (this.user !== null) {
      this.loginService.getUserById(Number(this.user)).subscribe((response) => {
        this.loginService.userAuthentication();
        this.loginService.setCurrentUser(response);
        this.store.dispatch(setLoginData(response));
        if (response.role === 'Admin') {
          this.router.navigate(['admin']);
        }
      });
    }
    this.isLogged = false;
  }

  getMeBack() {
    this.router.navigate(['']);
  }

  logoutUser() {
    this.loginService.userLogout();
    this.router.navigate(['']);
  }

  constructor(
    private router: Router,
    private loginService: LoginService,
    private store: Store<{ user?: User }>
  ) {
    this.checkUser();
    this.loginService.user$.subscribe(
      (response) => (this.userRole = response.role)
    );
  }

  ngOnInit(): void {
    this.checkUser();
    this.checkLoginStatus();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
