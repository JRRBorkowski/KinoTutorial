import { User } from 'src/app/login/login.types';

export const selectUser = (state: { userData: { user?: User } }) =>
  state.userData.user;

export const selectUserId = (state: { userData: { user?: User } }) =>
  state.userData.user?.id;

export const selectUserRole = (state: { userData: { user?: User } }) =>
  state.userData.user?.role;
