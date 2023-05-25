import { all, call, put, takeLatest } from 'redux-saga/effects';
import { startAction, stopAction } from '../loader/loader.actions';
import DashboardApi from 'services/dashboard.service';
import * as actions from '../dashboard/dashboard.actions';
import { showSnackbar } from '../snackbar/snackbar.actions';
import {
  GET_CLASSMATES_REQUEST,
  GET_STUDY_PROGRESS_REQUEST,
  getClassmatesRequest,
  getStudyProgressRequest,
} from './dashboard.types';
import { RecentlyActiveStudent } from 'entities/Student';
import { StudyProgressResponse } from 'entities/Dashboard';

export function* getClassmates({ type }: getClassmatesRequest) {
  yield put(startAction(type));
  try {
    const classmates: RecentlyActiveStudent[] = yield call(DashboardApi.getClassmates);
    yield put(actions.getClassmatesSuccess(classmates));
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: 'Cannot get recently active classmates' }));
  } finally {
    yield put(stopAction(type));
  }
}

export function* getStudyProgress({ type, payload }: getStudyProgressRequest) {
  yield put(startAction(type));
  try {
    const statistics: StudyProgressResponse = yield call(DashboardApi.getStatistics, payload);
    yield put(actions.getStudyProgressSuccess(statistics));
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: 'Cannot get recently active classmates' }));
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([
    takeLatest(GET_CLASSMATES_REQUEST, getClassmates),
    takeLatest(GET_STUDY_PROGRESS_REQUEST, getStudyProgress),
  ]);
}
