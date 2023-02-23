import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/types';
import { setLoginData, resetLoginData } from './user-data.actions';

export const initialState: { user?: User } = {
  user: undefined
};

export const userDataReducer = createReducer(
  initialState,
  on(setLoginData, (state, user) => ({
    ...state,
    user
  })),
  on(resetLoginData, () => initialState)
);