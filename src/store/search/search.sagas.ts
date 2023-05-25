import { Student } from 'entities/Student';
import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { profileSelector } from 'store/auth/auth.selectors';
import { startAction, stopAction } from 'store/loader/loader.actions';
import { searchSuccess, setSearchQuery } from 'store/search/search.actions';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import {
  SEARCH_GROUPMATES_REQUEST,
  SEARCH_SUBJECTS_TOPICS_REQUEST,
  SearchGroupMatesRequest,
  SearchSubjectsTopicsRequest,
} from './search.types';
import { getTopicsSuccess } from '../topics/topic.actions';
import { getSubjectsSuccess } from '../subjects/subjects.actions';
import { Subject } from 'entities/Subject';
import { Topic } from 'entities/Topic';
import SearchApi from 'services/search.service';
import UsersApi from 'services/user.service';
import { t } from 'i18next';

function* searchSubjectsTopics({ payload, type }: SearchSubjectsTopicsRequest) {
  yield put(startAction(type));
  try {
    const result: { subjects: Subject[]; topics: Topic[] } = yield call(
      SearchApi.searchSubjectAndTopics,
      payload,
    );
    yield put(setSearchQuery(payload));
    yield put(getSubjectsSuccess(result.subjects));
    yield put(getTopicsSuccess(result.topics));
  } catch (e) {
    yield put(getSubjectsSuccess([]));
    yield put(getTopicsSuccess([]));
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* searchGroupmates({ payload, type }: SearchGroupMatesRequest) {
  yield put(startAction(type));
  const { id: myId } = yield select(profileSelector);
  try {
    const students: Student[] = yield call(UsersApi.getGroupmates, payload);
    yield put(setSearchQuery(payload));
    yield put(searchSuccess(students.filter((student) => student.id !== myId)));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([takeLatest(SEARCH_SUBJECTS_TOPICS_REQUEST, searchSubjectsTopics)]);
  yield all([takeLatest(SEARCH_GROUPMATES_REQUEST, searchGroupmates)]);
}
