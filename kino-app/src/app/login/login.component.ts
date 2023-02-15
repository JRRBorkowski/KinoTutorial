import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { User } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  performLogin(user : User) {
    switch (user.role) {
      case "Admin":
        this.loginAuth.userAuthentication();
        this.loginAuth.setCurrentUser(user);
        this.router.navigate(['admin']);
        break;
      case "User":
        this.loginAuth.userAuthentication();
        this.loginAuth.setCurrentUser(user);
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
        if (userEmail === user.userEmail && userPassword === user.userPassword) {
          this.performLogin(user);
        } else {
          this.invalidUser = true;
        }
      })
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
    private loginAuth: LoginService
  ) {}

  ngOnInit(): void {}
}