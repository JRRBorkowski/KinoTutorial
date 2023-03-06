import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap, switchMap, map } from 'rxjs/operators';
import { AuthActions, AuthApiActions, setLoginData } from './user-data.actions';
import { EMPTY, catchError } from 'rxjs';
import { UserDataService } from '../user-data.service';

@Injectable()
export class UserDataEffects {
  setUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setLoginData),
        tap(
          (action) => {
            return localStorage.setItem(
              'loginData',
              JSON.stringify(action.userEmail)
            );
          },
          catchError(() => EMPTY)
        )
      ),
    { dispatch: false }
  );

  getUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getid),
      switchMap(({ userId }) => {
        return this.service.getUser(userId).pipe(
          map((result) => {
            return AuthApiActions.getUserSuccess(result);
          })
        );
      })
    )
  );
  //     getUserEffect$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.getId),
  //       switchMap(({ userId }) => {
  //         return this.authService.getUser(userId).pipe(
  //           map((result) => {
  //             return AuthApiActions.getUserSuccess(result);
  //           })
  //         );
  //       })
  //     )
  //   );

  constructor(private actions$: Actions, private service: UserDataService) {}
}
