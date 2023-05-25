import { all, call, put, takeLatest } from 'redux-saga/effects';
import MaterialFrameApi from 'services/material-frame.service';
import { startAction, stopAction } from 'store/loader/loader.actions';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import * as actions from './material-frame.actions';
import { t } from 'i18next';
import {
  GET_IS_URL_BLOCKED_FOR_IFRAME_REQUEST,
  GetIsUrlBlockedForIFrameRequest,
} from './material-frame.types';

export function* getIsUrlBlockedForIFrame({ type, url }: GetIsUrlBlockedForIFrameRequest) {
  yield put(startAction(type));
  try {
    const result: boolean = yield call(MaterialFrameApi.getIsUrlBlockedForIFrame, url);
    yield put(actions.getIsUrlBlockedForIFrameSuccess(url, result));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Material-Frame.Can not get if url is blocked for iframe.'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([takeLatest(GET_IS_URL_BLOCKED_FOR_IFRAME_REQUEST, getIsUrlBlockedForIFrame)]);
}
