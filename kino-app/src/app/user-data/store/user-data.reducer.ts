import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/types';
import { setLoginData, resetLoginData } from './user-data.actions';

export const initialState : {user: User} = {
    user:     {
      id: 0,
      "userName": "Billy",
      "userLastName": "Herrington",
      "userEmail": "aniki@gmail.com",
      "userPassword": "asdf",
      "role": "User",
      "userPhoneNumber": "600700800",
      "userInvoiceDetails": [
        {
          "userNIP": "",
          "userStreet": "",
          "userPostCode": "",
          "userCity": ""
        }
      ],
      "userWatchlist": []
    },
  };

export const userDataReducer = createReducer(
  initialState,
  on(setLoginData, (state, user ) => ({
    ...state,
    user})),
  on(resetLoginData, () => initialState)
);