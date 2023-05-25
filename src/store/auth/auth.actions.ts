// Contains all login, logout actions
import { actions, UserCredentials } from './auth.types';
import { RegistrationRequest } from 'entities/Registration';
import { User } from 'entities';
import { ChangeProfileRequest } from 'entities/Profile';
import { NavigateFunction } from 'react-router-dom';

export const register = (registerData: RegistrationRequest, navigate: NavigateFunction) => ({
  type: actions.AUTH_REGISTER,
  payload: { registerData, navigate, history },
});

export const updateProfile = (payload: ChangeProfileRequest) => ({
  type: actions.AUTH_UPDATE_PROFILE,
  payload,
});

export const getUser = () => ({
  type: actions.AUTH_GET_USER,
});

export const setUser = (payload: User) => ({
  type: actions.AUTH_SET_USER,
  payload,
});

export const emailValidation = (payload: {
  email: string;
  onValidated: () => void;
  onError: (errorMessage: string) => void;
}) => ({
  type: actions.AUTH_EMAIL_VALIDATION,
  payload,
});

export const nicknameValidation = (payload: {
  email: string;
  onValidated: () => void;
  onError: (errorMessage: string) => void;
}) => ({
  type: actions.AUTH_NICKNAME_VALIDATION,
  payload,
});

export const updateProfileComplete = (payload: ChangeProfileRequest) => ({
  type: actions.AUTH_UPDATE_PROFILE_COMPLETE,
  payload,
});

export const changePassword = (payload: {
  oldPassword: string;
  newPassword: string;
  navigate: NavigateFunction;
  token?: string;
  successAction?: () => void;
}) => ({
  type: actions.AUTH_CHANGE_PASSWORD,
  payload,
});

export const setAuthLoading = (payload: boolean) => ({
  type: actions.AUTH_SET_LOADING,
  payload,
});

export const authInit = (payload: { onInited: () => void }) => ({
  type: actions.AUTH_INIT,
  payload,
});

export const getFingerprint = (fingerprint: string) => ({
  type: actions.AUTH_FINGERPRINT,
  payload: { fingerprint },
});

export const login = (
  credentials: UserCredentials,
  navigate: NavigateFunction,
  onSuccess: () => void,
) => ({
  type: actions.AUTH_LOGIN,
  payload: { credentials, navigate, onSuccess },
});

export const loginSuccess = (payload: { token: string }) => ({
  type: actions.AUTH_LOGIN_SUCCESS,
  payload,
});

export const loginError = (error: any) => ({
  type: actions.AUTH_LOGIN_ERROR,
  payload: error,
});

export const resetPassword = (payload: {
  email: string;
  onSuccess: () => void;
  onError: () => void;
}) => ({
  type: actions.AUTH_RESET_PASSWORD,
  payload,
});

export const tokenRefresh = () => ({
  type: actions.AUTH_TOKEN_REFRESH,
});

export const tokenRefreshSuccess = (user: User, token: string) => ({
  type: actions.AUTH_TOKEN_REFRESH_SUCCESS,
  payload: { user, token },
});

export const tokenRefreshError = (error: any) => ({
  type: actions.AUTH_TOKEN_REFRESH_ERROR,
  payload: error,
});

export const logout = () => ({
  type: actions.AUTH_LOGOUT,
});

export const logoutSuccess = () => ({
  type: actions.AUTH_LOGOUT_SUCCESS,
});

export const logoutError = (error: any) => ({
  type: actions.AUTH_LOGOUT_ERROR,
  error,
});
