import { all, call, put, takeLatest } from 'redux-saga/effects';
import GradesApi from 'services/grades.service';
import { startAction, stopAction } from 'store/loader/loader.actions';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import * as actions from './grade.actions';
import { GET_GRADES_REQUEST, GetGradesRequest } from './grade.types';
import { Grade } from 'entities/Grade';
import { t } from 'i18next';

export function* getGrades({ type }: GetGradesRequest) {
  yield put(startAction(type));
  try {
    const grades: Grade[] = yield call(GradesApi.getGrades);
    yield put(actions.getGradesSuccess(grades));
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Grade.Can not get grades') }));
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([takeLatest(GET_GRADES_REQUEST, getGrades)]);
}
