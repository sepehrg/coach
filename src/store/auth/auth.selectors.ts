import { createSelector } from 'reselect';
import { RootState } from 'store/rootReducer';
import { AuthState } from './auth.types';

export const authSelector = (state: RootState) => state.auth;

export const isAuthorizedSelector = createSelector(authSelector, (auth: AuthState) => !!auth.token);
export const isLoadingSelector = createSelector(authSelector, (auth: AuthState) => auth.loading);
export const profileSelector = createSelector(authSelector, (auth: AuthState) => auth.user);
export const userNameSelector = createSelector(
  authSelector,
  (auth: AuthState) => auth.user?.firstName,
);
export const userGradeSelector = createSelector(
  authSelector,
  (auth: AuthState) => auth.user?.grade,
);
export const userRoleSelector = createSelector(authSelector, (auth: AuthState) => auth.user?.role);
export const userStarsSelector = createSelector(
  authSelector,
  (auth: AuthState) => auth.user?.stars,
);
export const validationErrorSelector = createSelector(
  authSelector,
  (auth: AuthState) => auth.error,
);

// Fingerprint
export const fingerprintSelector = createSelector(
  authSelector,
  (auth: AuthState) => auth.fingerprint,
);
