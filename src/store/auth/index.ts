import { useDispatch } from 'react-redux';
import { UserCredentials } from './auth.types';
import {
  authInit,
  changePassword,
  emailValidation,
  getUser,
  login,
  logout,
  nicknameValidation,
  register,
  resetPassword,
  updateProfile,
} from './auth.actions';
import { RegistrationRequest } from 'entities/Registration';
import { ChangeProfileRequest } from 'entities/Profile';
import { useMemo } from 'react';
import { NavigateFunction } from 'react-router-dom';

const useAuthActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      login: (credentials: UserCredentials, navigate: NavigateFunction, onSuccess: () => void) => {
        dispatch(login(credentials, navigate, onSuccess));
      },
      register: (registerData: RegistrationRequest, navigate: NavigateFunction) => {
        dispatch(register(registerData, navigate));
      },
      authInit: (onInited: (value: boolean) => void) => {
        dispatch(
          authInit({
            onInited: () => {
              onInited(true);
            },
          }),
        );
      },
      logout: () => {
        dispatch(logout());
      },
      resetPassword: (email: string, onSuccess: () => void, onError: () => void) => {
        dispatch(resetPassword({ email, onSuccess, onError }));
      },
      changePassword: ({
        oldPassword,
        newPassword,
        token,
        navigate,
        successAction,
      }: {
        oldPassword: string;
        newPassword: string;
        token?: string;
        navigate: NavigateFunction;
        successAction?: () => void;
      }) => {
        dispatch(changePassword({ oldPassword, newPassword, navigate, token, successAction }));
      },
      updateProfile: (profile: ChangeProfileRequest) => {
        dispatch(updateProfile(profile));
      },
      getProfile: () => {
        dispatch(getUser());
      },
      validateEmail: (
        email: string,
        onValidated: () => void,
        onError: (errorMessage: string) => void,
      ) => {
        dispatch(emailValidation({ email, onValidated, onError }));
      },
      validateNickname: (
        email: string,
        onValidated: () => void,
        onError: (errorMessage: string) => void,
      ) => {
        dispatch(nicknameValidation({ email, onValidated, onError }));
      },
    }),
    [dispatch],
  );
};

export default useAuthActions;
