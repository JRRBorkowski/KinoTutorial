import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { setLoginData } from './user-data.actions';
import { EMPTY, catchError } from 'rxjs'

@Injectable()
export class UserDataEffects {

    setUserData$ = createEffect(() => this.actions$.pipe(
        ofType(setLoginData),
        tap((action) => {
            localStorage.setItem( 'loginData', JSON.stringify(action) )
        },
        catchError(() => EMPTY))
    ), {dispatch: false})

    constructor(
        private actions$: Actions 
    ) {}
}