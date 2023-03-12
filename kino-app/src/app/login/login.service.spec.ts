import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { User } from './login.types';

const user: User = {
  id: 0,
  userName: 'userName',
  userLastName: 'userLastName',
  userEmail: 'userEmail',
  userPassword: 'userPassword',
  role: 'User',
  userPhoneNumber: 'userPhoneNumber',
  userInvoiceDetails: {
    userNIP: 'userNIP',
    userStreet: 'userStreet',
    userPostCode: 'userPostCode',
    userCity: 'userCity',
  },
  userWatchlist: [],
};

describe('LoginService', () => {
  it('login initial state', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(LoginService);

    state.isUserLoggedIn$.subscribe((result) => {
      expect(result).toEqual(false);
      done;
    });
  });

  it('login', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(LoginService);

    state.userAuthentication();

    state.isUserLoggedIn$.subscribe((result) => {
      expect(result).toEqual(true);
      done;
    });
  });

  it('set user', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(LoginService);

    state.setCurrentUser(user);

    state.user$.subscribe((result) => {
      expect(result).toEqual(user);
      done;
    });
  });

  it('logout user', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(LoginService);

    state.userLogout();

    state.user$.subscribe((result) => {
      expect(result).toEqual({} as User);
      done;
    });
  });
});
