import { RegistrationRequest } from 'entities/Registration';
import { User } from 'entities';
import { ChangeProfileRequest } from 'entities/Profile';
import { NavigateFunction } from 'react-router-dom';

export interface UserCredentials {
  email: string;
  password: string;
  isRememberMe: boolean;
  fingerprint?: string;
}

export enum AuthErrorType {
  InvalidCredentials = 'Wrong credentials',
  EmailAlreadyTaken = 'Email is already taken',
  NonAuthorized = 'Non authorized',
  WrongEmail = 'Wrong Email',
}

export interface AuthState {
  user: User | null;
  token?: string | null;
  loading: boolean;
  error?: AuthErrorType | null;
  fingerprint?: string | null;
}

// Init authentication flow
export const actions = {
  AUTH_INIT: 'AUTH_INIT',
  AUTH_FINGERPRINT: 'AUTH_FINGERPRINT',
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_ERROR: 'AUTH_LOGIN_ERROR',
  AUTH_TOKEN_REFRESH: 'AUTH_TOKEN_REFRESH',
  AUTH_TOKEN_REFRESH_SUCCESS: 'AUTH_TOKEN_REFRESH_SUCCESS',
  AUTH_TOKEN_REFRESH_ERROR: 'AUTH_TOKEN_REFRESH_ERROR',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_LOGOUT_ERROR: 'AUTH_LOGOUT_ERROR',
  AUTH_REGISTER: 'AUTH_REGISTER',
  AUTH_REGISTER_COMPLETE: 'AUTH_REGISTER_COMPLETE',
  AUTH_MAIN_VALIDATION: 'AUTH_MAIN_VALIDATION',
  AUTH_ADDITIONAL_VALIDATION: 'AUTH_ADDITIONAL_VALIDATION',
  AUTH_CHANGE_PASSWORD: 'AUTH_CHANGE_PASSWORD',
  AUTH_RESET_PASSWORD: 'AUTH_RESET_PASSWORD',
  AUTH_UPDATE_PROFILE: 'AUTH_UPDATE_PROFILE',
  AUTH_UPDATE_PROFILE_COMPLETE: 'AUTH_UPDATE_PROFILE_COMPLETE',
  AUTH_GET_USER: 'AUTH_GET_USER',
  AUTH_SET_USER: 'AUTH_SET_USER',
  AUTH_EMAIL_VALIDATION: 'AUTH_EMAIL_VALIDATION',
  AUTH_NICKNAME_VALIDATION: 'AUTH_NICKNAME_VALIDATION',
  AUTH_SET_LOADING: 'AUTH_SET_LOADING',
};

export interface RegisterAction {
  type: typeof actions.AUTH_REGISTER;
  payload: { registerData: RegistrationRequest; navigate: NavigateFunction };
}

export interface AuthInitAction {
  type: typeof actions.AUTH_INIT;
  payload: { onInited: () => void };
}

export interface ChangePasswordAction {
  type: typeof actions.AUTH_CHANGE_PASSWORD;
  payload: {
    oldPassword: string;
    newPassword: string;
    token?: string;
    navigate: NavigateFunction;
    successAction: () => void;
  };
}

export interface SetLoadingAction {
  type: typeof actions.AUTH_SET_LOADING;
  payload: boolean;
}

export interface EmailValidationAction {
  type: typeof actions.AUTH_EMAIL_VALIDATION;
  payload: { email: string; onValidated: () => void; onError: (errorMessage: string) => void };
}

export interface NicknameValidationAction {
  type: typeof actions.AUTH_EMAIL_VALIDATION;
  payload: { email: string; onValidated: () => void; onError: (errorMessage: string) => void };
}

export interface ResetPasswordAction {
  type: typeof actions.AUTH_RESET_PASSWORD;
  payload: { email: string; onSuccess: () => void; onError: () => void };
}

export interface SetUserAction {
  type: typeof actions.AUTH_SET_USER;
  payload: User;
}

export interface GetUserAction {
  type: typeof actions.AUTH_GET_USER;
}

export interface UpdateProfileAction {
  type: typeof actions.AUTH_UPDATE_PROFILE;
  payload: ChangeProfileRequest;
}

export interface UpdateProfileCompleteAction {
  type: typeof actions.AUTH_UPDATE_PROFILE_COMPLETE;
  payload: ChangeProfileRequest;
}

export interface RegisterCompleteAction {
  type: typeof actions.AUTH_REGISTER_COMPLETE;
  payload: User;
}

export interface MainValidationAction {
  type: typeof actions.AUTH_MAIN_VALIDATION;
}

export interface AdditionalValidationRequest {
  type: typeof actions.AUTH_ADDITIONAL_VALIDATION;
}

export interface LoginAction {
  type: typeof actions.AUTH_LOGIN;
  payload: { credentials: UserCredentials; navigate: NavigateFunction; onSuccess: () => void };
}

export interface LoginSuccessAction {
  type: typeof actions.AUTH_LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

export interface LoginErrorAction {
  type: typeof actions.AUTH_LOGIN_ERROR;
  payload: any;
}

export interface LogoutAction {
  type: typeof actions.AUTH_LOGIN;
}

export interface LogoutSuccessAction {
  type: typeof actions.AUTH_LOGIN_SUCCESS;
}

export interface LogoutErrorAction {
  type: typeof actions.AUTH_LOGIN_ERROR;
  error: any;
}

export interface tokenRefreshAction {
  type: typeof actions.AUTH_TOKEN_REFRESH;
}

export interface tokenRefreshSuccessAction {
  type: typeof actions.AUTH_TOKEN_REFRESH_SUCCESS;
  payload: { user: User; token: string };
}

export interface tokenRefreshErrorAction {
  type: typeof actions.AUTH_TOKEN_REFRESH_ERROR;
  payload: any;
}

export type AuthActionTypes =
  | RegisterAction
  | RegisterCompleteAction
  | MainValidationAction
  | AdditionalValidationRequest
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutErrorAction
  | tokenRefreshAction
  | tokenRefreshSuccessAction
  | tokenRefreshErrorAction
  | ChangePasswordAction
  | UpdateProfileAction
  | SetUserAction
  | EmailValidationAction
  | SetLoadingAction;
