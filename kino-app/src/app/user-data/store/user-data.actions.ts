import { createAction, createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from '../../types';

export const SET_LOGIN_DATA_ACTION = '[UserData] SetLoginData';
export const RESET_LOGIN_DATA_ACTION = '[UserData] ResetLoginData';


export const setLoginData = createAction(SET_LOGIN_DATA_ACTION, props<User>());
export const resetLoginData = createAction(RESET_LOGIN_DATA_ACTION);

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
      login: props<User>(),
      getId: props<{ userId: number }>(),
      logout: emptyProps(),
    },
  });

  export const AuthApiActions = createActionGroup({
    source: 'Auth API',
    events: {
      'login success': props<User>(),
      'get user success': props<User>(),
    },
  });