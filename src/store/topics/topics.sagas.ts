import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import TopicApi from 'services/topics.service';
import SubjectApi from 'services/subjects.sevice';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import * as actions from './topic.actions';
import { Topic } from 'entities/Topic';
import {
  GET_TOPIC_BY_ID_REQUEST,
  GET_TOPICS_REQUEST,
  GET_TOPICS_BY_SUBJECT_REQUEST,
  GetTopicByIdRequest,
  GetTopicsRequest,
  GetTopicsBySubjectRequest,
} from './topics.types';
import { Subject } from 'entities/Subject';
import { selectSubject } from '../subjects/subjects.actions';
import { profileSelector } from '../auth/auth.selectors';
import { startAction, stopAction } from '../loader/loader.actions';
import { t } from 'i18next';

function* getTopics({ type }: GetTopicsRequest) {
  yield put(startAction(type));
  try {
    const topics: Topic[] = yield call(TopicApi.getTopics);
    yield put(actions.getTopicsSuccess(topics));
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Topics.Can not get topics') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* getTopicsBySubject({ payload, type }: GetTopicsBySubjectRequest) {
  yield put(startAction(type));
  try {
    const { grade } = yield select(profileSelector);
    const topics: Topic[] = yield call(TopicApi.getTopicsBySubject, payload, grade.year);
    const selectedSubject: Subject = yield call(SubjectApi.getSubjectById, payload);
    yield put(selectSubject(selectedSubject));
    yield put(actions.getTopicsSuccess(topics));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Topics.Can not get topics by current subject'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getTopicById({ payload, type }: GetTopicByIdRequest) {
  yield put(startAction(type));
  try {
    const topics: Topic[] = yield call(TopicApi.getTopicById, payload);
    yield put(actions.selectTopic(topics[0]));
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Topics.Can not get current topic'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([
    takeLatest(GET_TOPICS_REQUEST, getTopics),
    takeLatest(GET_TOPICS_BY_SUBJECT_REQUEST, getTopicsBySubject),
    takeLatest(GET_TOPIC_BY_ID_REQUEST, getTopicById),
  ]);
}
