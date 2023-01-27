import { createSelector } from 'reselect';
import { RootState } from '../../../store';
import { AuthState } from './auth.slice';

export const authSelector: (state: RootState) => AuthState = (
  state: RootState
) => state.auth;

export const displayNameSelector = createSelector(authSelector, auth => {
  return auth.displayName;
});

export const emailSelector = createSelector(authSelector, auth => {
  return auth.email;
});

export const isUserAuthenticatedSelector = createSelector(
  authSelector,
  auth => {
    return auth.authenticated;
  }
);

export const authErrorSelector = createSelector(authSelector, auth => {
  return auth.error;
});