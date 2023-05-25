import { produce } from 'immer';
import { actions, AuthState } from './auth.types';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

const AuthReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.AUTH_INIT:
      case actions.AUTH_LOGIN:
        draft.loading = true;
        break;
      case actions.AUTH_FINGERPRINT:
        draft.fingerprint = action.payload.fingerprint;
        break;
      case actions.AUTH_SET_USER:
        draft.user = action.payload;
        break;
      case actions.AUTH_LOGIN_SUCCESS:
      case actions.AUTH_TOKEN_REFRESH_SUCCESS:
        draft.loading = false;
        draft.token = action.payload.token;
        break;
      case actions.AUTH_LOGIN_ERROR:
      case actions.AUTH_TOKEN_REFRESH_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        break;
      case actions.AUTH_SET_LOADING:
        draft.loading = action.payload;
        break;
      case actions.AUTH_LOGOUT:
        draft.user = initialState.user;
        draft.error = null;
        draft.token = null;
        break;
    }
  });

export default AuthReducer;
