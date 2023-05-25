import { all, call, put, takeLatest } from 'redux-saga/effects';
import { startAction, stopAction } from '../loader/loader.actions';
import StudyNotesApi from 'services/studynotes.service';
import * as actions from '../studyNotes/studyNotes.actions';
import { showSnackbar } from '../snackbar/snackbar.actions';
import { t } from 'i18next';
import {
  CreateStudyNoteRequest,
  CREATE_STUDY_NOTE_REQUEST,
  GetFavoriteStudyNotesRequest,
  GetStudyNoteRequest,
  GetStudyNoteOverviewRequest,
  GET_FAVORITE_STUDY_NOTES_REQUEST,
  GET_STUDY_NOTE_OVERVIEW_REQUEST,
  GET_STUDY_NOTE_REQUEST,
  UpdateStudyNoteRequest,
  UPDATE_STUDY_NOTE_REQUEST,
} from './studyNotes.types';
import { StudyNote } from 'entities/StudyNote';

function* getStudyNote({ type, payload }: GetStudyNoteRequest) {
  yield put(startAction(type));
  try {
    const response: StudyNote[] = yield call(StudyNotesApi.getStudyNote, payload);
    payload.onSuccess(response);
    yield put(actions.getStudyNoteSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Notes.Notifications.Cannot get note'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getStudyNoteOverview({ type, payload }: GetStudyNoteOverviewRequest) {
  yield put(startAction(type));
  try {
    const response: StudyNote[] = yield call(StudyNotesApi.getStudyNoteOverview, payload);
    yield put(actions.getStudyNoteOverviewSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Notes.Notifications.Cannot get note'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getFavoriteStudyNotes({ type }: GetFavoriteStudyNotesRequest) {
  yield put(startAction(type));
  try {
    const response: StudyNote[] = yield call(StudyNotesApi.getFavoriteStudyNotes);
    yield put(actions.getFavoriteStudyNotesSuccess(response));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Notes.Notifications.Cannot get notes'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* createStudyNote({ type, payload }: CreateStudyNoteRequest) {
  yield put(startAction(type));
  try {
    const response: StudyNote = yield call(StudyNotesApi.create, payload);
    payload.onSuccess(response);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Notes.Notifications.Cannot create'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* updateStudyNote({ type, payload }: UpdateStudyNoteRequest) {
  yield put(startAction(type));
  try {
    yield call(StudyNotesApi.update, payload);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Study Notes.Notifications.Cannot update'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([
    takeLatest(GET_STUDY_NOTE_REQUEST, getStudyNote),
    takeLatest(GET_STUDY_NOTE_OVERVIEW_REQUEST, getStudyNoteOverview),
    takeLatest(GET_FAVORITE_STUDY_NOTES_REQUEST, getFavoriteStudyNotes),
    takeLatest(CREATE_STUDY_NOTE_REQUEST, createStudyNote),
    takeLatest(UPDATE_STUDY_NOTE_REQUEST, updateStudyNote),
  ]);
}
