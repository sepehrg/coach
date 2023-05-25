import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { GetIdoActionRequest, GET_GREETING_REQUEST, GET_IDO_ACTION_REQUEST } from './ido.types';
import IdoActionApi from './../../services/ido.service';
import { getGreetingSuccess, getIdoActionSuccess } from './ido.actions';
import { IdoAction, IdoActionTypes } from 'entities/Ido';

function* getGreetingRequest() {
  const greeting: IdoAction = yield call(IdoActionApi.getAction, { type: IdoActionTypes.GREETING });
  if (greeting) {
    yield put(getGreetingSuccess(greeting));
    localStorage.setItem('greeting', JSON.stringify(greeting));
  }
}

function* getIdoActionRequest({ payload }: GetIdoActionRequest) {
  const action: IdoAction = yield call(IdoActionApi.getAction, payload);
  if (action) {
    yield put(getIdoActionSuccess(action));
  }
}

export default function* () {
  yield all([
    takeLatest(GET_GREETING_REQUEST, getGreetingRequest),
    takeEvery(GET_IDO_ACTION_REQUEST, getIdoActionRequest),
  ]);
}
