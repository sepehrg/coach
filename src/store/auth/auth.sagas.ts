import { User } from 'entities';
import jwtDecode from 'jwt-decode';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import AuthAPI from 'services/auth.service';
import { startAction, stopAction } from 'store/loader/loader.actions';
import { navigateToLogin } from '../router/router.actions';
import { showSnackbar } from '../snackbar/snackbar.actions';
import Cookies from 'universal-cookie';
import {
  login as loginAction,
  loginError,
  loginSuccess,
  logoutError,
  logoutSuccess,
  setAuthLoading,
  setUser,
  tokenRefreshSuccess,
} from './auth.actions';
import {
  actions,
  AuthErrorType,
  AuthInitAction,
  ChangePasswordAction,
  EmailValidationAction,
  LoginAction,
  NicknameValidationAction,
  RegisterAction,
  ResetPasswordAction,
  UpdateProfileAction,
} from './auth.types';
import { t } from 'i18next';
import moment from 'moment';

export function* authInit({ payload }: AuthInitAction) {
  const cookies = new Cookies();
  const token = cookies.get('token');
  if (token) {
    try {
      const user: User = yield call(AuthAPI.getProfile);
      yield put(setUser(user));
      yield put(loginSuccess({ token }));
    } catch (e) {
      cookies.remove('token');
    }
  } else {
    yield put(loginError(AuthErrorType.NonAuthorized));
  }
  yield call(payload.onInited);
}

export function* register({ payload }: RegisterAction) {
  try {
    const user: User = yield call(AuthAPI.register, payload.registerData);
    yield put(
      loginAction(
        {
          email: user.email,
          password: payload.registerData.password,
          isRememberMe: false,
        },
        payload.navigate,
        () => {
          return;
        },
      ),
    );
  } catch (e) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Auth.Can not finish registration'),
      }),
    );
  }
}

export function* login({ payload, type }: LoginAction) {
  yield put(startAction(type));
  try {
    const response: { token: string } = yield call(AuthAPI.login, { ...payload.credentials });
    const { token } = response;
    const cookies = new Cookies();
    cookies.set('token', token, {
      expires: payload.credentials.isRememberMe
        ? moment().add(365, 'd').toDate()
        : moment().add(1, 'h').toDate(),
    });
    const user: User = yield call(AuthAPI.getProfile);
    yield put(setUser(user));
    yield put(loginSuccess({ token }));
    yield call(payload.onSuccess);
    yield put(
      showSnackbar({ type: 'success', message: t('Messages.Auth.Successfully signed in') }),
    );
  } catch (err) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Auth.Something wrong with credentials'),
      }),
    );
    yield put(navigateToLogin(payload.navigate));
  } finally {
    yield put(stopAction(type));
  }
}

export function* refreshToken() {
  try {
    const { fingerprint } = yield select((state) => state.auth);
    // TODO: ask if refreshToken shouldn't be sent together with fingerprint
    const response: { accessToken: string } = yield call(AuthAPI.tokenRefresh, fingerprint);
    const { accessToken } = response;

    const tokenDecoded: any = jwtDecode(accessToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, iat, ...user } = tokenDecoded;

    yield put(tokenRefreshSuccess(user, accessToken));
    localStorage.setItem('token', accessToken);
  } catch (err) {
    // yield put(tokenRefreshError(err))
  }
}

export function* logout() {
  try {
    const cookies = new Cookies();
    cookies.remove('token');
    yield put(logoutSuccess());
    yield put(
      showSnackbar({
        type: 'success',
        message: t('Messages.Auth.Successfully logged out'),
      }),
    );
  } catch (err) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Auth.Something wrong with logout'),
      }),
    );
  }
}

function* getUser() {
  try {
    const user: User = yield call(AuthAPI.getProfile);
    yield put(setUser(user));
  } catch (err) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Auth.Can not get profile details'),
      }),
    );
  }
}

function* updateProfile({ payload, type }: UpdateProfileAction) {
  yield put(startAction(type));
  try {
    console.log('PAYLOAD', payload);
    let user: User;
    if (payload.icon) {
      const data = new FormData();
      Object.keys(payload).forEach((key) => {
        const value = payload[key as keyof typeof payload];
        if (value) {
          data.append(key, value instanceof Date ? new Date(value).toISOString() : value);
        }
      });
      user = yield call(AuthAPI.changeProfileWithIcon, data);
    } else {
      user = yield call(AuthAPI.changeProfile, payload);
    }
    yield put(setUser(user));
    yield put(
      showSnackbar({
        type: 'success',
        message: t('Messages.Auth.Successfully updated profile'),
      }),
    );
  } catch (err) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Something went wrong, try again'),
      }),
    );
    yield put(logoutError(err));
  } finally {
    yield put(stopAction(type));
  }
}

function* changePassword({ payload, type }: ChangePasswordAction) {
  yield put(setAuthLoading(true));
  yield put(startAction(type));
  try {
    if (payload.token) {
      yield call(AuthAPI.changePassword, payload.oldPassword, payload.newPassword, payload.token);
      yield put(navigateToLogin(payload.navigate));
      yield put(showSnackbar({ message: 'Password successful reset.', type: 'success' }));
    } else {
      yield call(AuthAPI.changePassword, payload.oldPassword, payload.newPassword);
      payload.successAction();
      yield put(
        showSnackbar({
          type: 'success',
          message: t('Messages.Auth.Password successfully updated'),
        }),
      );
    }
  } catch (err) {
    yield put(logoutError(err));
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Auth.Password was not updated'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
  yield put(setAuthLoading(false));
}

function* emailValidation({ payload, type }: EmailValidationAction) {
  yield put(startAction(type));
  try {
    yield call(AuthAPI.validateEmail, payload.email);
  } catch (e) {
    yield payload.onError(t('Messages.Auth.Email is already taken'));
  } finally {
    yield payload.onValidated();
    yield put(stopAction(type));
  }
}

function* nicknameValidation({ payload, type }: NicknameValidationAction) {
  yield put(startAction(type));
  try {
    yield call(AuthAPI.validateNickname, payload.email);
  } catch (e) {
    yield payload.onError(t('Messages.Auth.Nickname is already taken'));
  } finally {
    yield payload.onValidated();
    yield put(stopAction(type));
  }
}

function* resetPassword({ payload: { email, onError, onSuccess }, type }: ResetPasswordAction) {
  yield put(startAction(type));
  try {
    yield call(AuthAPI.resetPassword, email);
    yield call(onSuccess);
  } catch (e) {
    yield put(loginError(AuthErrorType.WrongEmail));
    yield put(showSnackbar({ type: 'error', message: t('Messages.Auth.User does not exist') }));
    yield call(onError);
  } finally {
    yield put(stopAction(type));
  }
}

export default function* root() {
  yield all([
    takeLatest(actions.AUTH_INIT, authInit),
    takeLatest(actions.AUTH_LOGIN, login),
    takeLatest(actions.AUTH_TOKEN_REFRESH, refreshToken),
    takeLatest(actions.AUTH_LOGOUT, logout),
    takeLatest(actions.AUTH_REGISTER, register),
    takeLatest(actions.AUTH_UPDATE_PROFILE, updateProfile),
    takeLatest(actions.AUTH_CHANGE_PASSWORD, changePassword),
    takeLatest(actions.AUTH_GET_USER, getUser),
    takeLatest(actions.AUTH_EMAIL_VALIDATION, emailValidation),
    takeLatest(actions.AUTH_NICKNAME_VALIDATION, nicknameValidation),
    takeLatest(actions.AUTH_RESET_PASSWORD, resetPassword),
  ]);
}
