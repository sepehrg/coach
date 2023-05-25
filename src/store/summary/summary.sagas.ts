import { all, call, put, takeLatest } from 'redux-saga/effects';
import StudentApi from 'services/student.service';
import { startAction, stopAction } from 'store/loader/loader.actions';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import * as actions from './summary.actions';
import * as topicActions from '../topics/topic.actions';
import { CREATE_SUMMARY_REQUEST, CreateSummaryRequest } from './summary.types';
import { LessonSummary } from 'entities/LessonSummary';
import { navigateToFocusTime } from '../router/router.actions';
import { getLessonsRequest } from '../lessons/lessons.actions';
import { t } from 'i18next';

export function* createSummary({ payload, type }: CreateSummaryRequest) {
  yield put(startAction(type));
  try {
    const summary: LessonSummary = yield call(StudentApi.createSummary, payload.summary);
    yield put(getLessonsRequest());
    yield put(actions.createSummarySuccess(summary));
    yield put(topicActions.clearSelectedTopic());
    yield put(navigateToFocusTime(payload.navigate));
    yield put(
      showSnackbar({
        type: 'success',
        message: t('Messages.Summary.Thanks for your feedback'),
      }),
    );
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Summary.Can not create a summary.'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([takeLatest(CREATE_SUMMARY_REQUEST, createSummary)]);
}
