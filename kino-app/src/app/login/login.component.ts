import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { User } from '../types';
import { setLoginData } from '../user-data/store/user-data.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //TODO: nie wyjebuje sesji na reload

  user$: Observable<User | undefined>;

  performLogin(user: User) {
    switch (user.role) {
      case 'Admin':
        this.loginAuth.userAuthentication();
        this.loginAuth.setCurrentUser(user);
        this.store.dispatch(setLoginData(user));
        this.router.navigate(['admin']);
        break;
      case 'User':
        this.loginAuth.userAuthentication();
        this.loginAuth.setCurrentUser(user);
        this.store.dispatch(setLoginData(user));
        this.router.navigate(['']);
        break;
      default:
        this.invalidUser = true;
    }
  }

  invalidUser = false;

  onLogIn() {
    const userEmail = this.loginForm.get('userEmail')?.value;
    const userPassword = this.loginForm.get('userPassword')?.value;

    this.loginAuth.getUsers().subscribe((response) => {
      response.forEach((user) => {
        if (
          userEmail === user.userEmail &&
          userPassword === user.userPassword
        ) {
          this.performLogin(user);
        } else {
          return;
        }
      });
    });
  }

  loginForm = this.builder.group({
    userEmail: this.builder.control('', {
      validators: [Validators.required, Validators.email],
    }),
    userPassword: this.builder.control('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private builder: NonNullableFormBuilder,
    private router: Router,
    private loginAuth: LoginService,
    private store: Store<{ userData: { user?: User } }>
  ) {
    this.user$ = this.store.select((state) => state.userData.user);
  }

  ngOnInit(): void {
    console.log('TODO: Initiate store');
  }
}
