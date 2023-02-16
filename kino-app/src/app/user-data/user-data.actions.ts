import { createAction, props } from '@ngrx/store';
import { User } from '../types';

export const SET_LOGIN_DATA_ACTION = '[UserData] SetLoginData';
export const RESET_LOGIN_DATA_ACTION = '[UserData] ResetLoginData';


export const setLoginData = createAction(SET_LOGIN_DATA_ACTION, props<User>());
export const resetLoginData = createAction(RESET_LOGIN_DATA_ACTION);