import { all, call, put, takeLatest } from 'redux-saga/effects';
import SubjectsApi from 'services/subjects.sevice';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import * as actions from './subjects.actions';
import { Subject } from 'entities/Subject';
import {
  GET_SUBJECTS_REQUEST,
  GetSubjectsRequest,
  GetSubjectByIdRequest,
  GET_SUBJECT_BY_ID_REQUEST,
  CreateSuggestedSubjectRequest,
  CREATE_SUGGESTED_SUBJECT_REQUEST,
  UpdateMySubjectsRequest,
  UPDATE_MY_SUBJECTS_REQUEST,
} from './subjects.types';
import { startAction, stopAction } from '../loader/loader.actions';
import { t } from 'i18next';

function* getSubjects({ type }: GetSubjectsRequest) {
  yield put(startAction(type));
  try {
    const subjects: Subject[] = yield call(SubjectsApi.getSubjects);
    yield put(actions.getSubjectsSuccess(subjects));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Subjects.Can not get subjects.'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getSubjectById({ type, payload }: GetSubjectByIdRequest) {
  yield put(startAction(type));
  try {
    const subject: Subject = yield call(SubjectsApi.getSubjectById, payload);
    yield put(actions.getSubjectByIdSuccess(subject));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Subjects.Can not get subject now.'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* createSuggested({ type, payload }: CreateSuggestedSubjectRequest) {
  yield put(startAction(type));
  try {
    yield call(SubjectsApi.createSuggested, payload.data);
    yield call(payload.onSuccess);
    yield put(
      showSnackbar({
        type: 'success',
        message: t('Messages.Subjects.Suggested subject created'),
      }),
    );
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Subjects.Can not create suggested subject'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* updateMySubjects({ type, payload }: UpdateMySubjectsRequest) {
  yield put(startAction(type));
  try {
    yield call(SubjectsApi.updateMySubjects, payload.subjects);
    yield call(payload.onSuccess);
    yield put(
      showSnackbar({
        type: 'success',
        message: t('Messages.Subjects.Subjects successful updated'),
      }),
    );
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Subjects.Can not update your subjects'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([takeLatest(GET_SUBJECTS_REQUEST, getSubjects)]);
  yield all([takeLatest(GET_SUBJECT_BY_ID_REQUEST, getSubjectById)]);
  yield all([takeLatest(CREATE_SUGGESTED_SUBJECT_REQUEST, createSuggested)]);
  yield all([takeLatest(UPDATE_MY_SUBJECTS_REQUEST, updateMySubjects)]);
}
