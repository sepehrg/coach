import { all, call, put, takeLatest } from 'redux-saga/effects';
import StudentApi from 'services/student.service';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import {
  finishLessonSuccess,
  getDefaultSessionDurationSuccess,
  getLessonByIdSuccess,
  startLessonSuccess,
} from './lessons.actions';
import * as actions from './lessons.actions';
import {
  CREATE_LESSON_REQUEST,
  CreateLessonRequest,
  DELETE_LESSON_REQUEST,
  DeleteLessonRequest,
  GET_LESSONS_REQUEST,
  GetLessonsRequest,
  GET_LESSONS_BY_MONTH_REQUEST,
  GetLessonByDayRequest,
  GetLessonsByMonthRequest,
  GET_LESSONS_BY_DAY_REQUEST,
  GetLessonByIdRequest,
  GET_LESSON_BY_ID_REQUEST,
  StartLessonRequest,
  START_LESSON_REQUEST,
  CreateGroupLessonRequest,
  CREATE_GROUP_LESSON_REQUEST,
  FinishLessonRequest,
  FINISH_LESSON_REQUEST,
  GetDefaultSessionDurationRequest,
  GET_DEFAULT_SESSION_DURATION,
} from './lessons.types';
import { FinishLessonResponse, Lesson } from 'entities/Lesson';
import { navigateToStudyLesson } from '../router/router.actions';
import { checkLessonValid, validateLessons } from 'utils/lessons';
import { startAction, stopAction } from '../loader/loader.actions';
import { t } from 'i18next';

export function* getLessons({ type }: GetLessonsRequest) {
  yield put(startAction(type));
  try {
    const lessons: Lesson[] = yield call(StudentApi.getLessons);
    const invalidLessons: Lesson[] = yield checkLessonValid(lessons);
    if (invalidLessons.length === 0) {
      yield put(actions.getLessonsByMonthSuccess(lessons));
    } else {
      yield all(invalidLessons.map((lesson: Lesson) => call(StudentApi.deleteLesson, lesson.id)));
      const validLessons: Lesson[] = yield call(StudentApi.getLessons);
      yield put(actions.getLessonsSuccess(validLessons));
    }
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Lessons.Can not get lessons.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* getLessonByDay({ payload: { today, tomorrow }, type }: GetLessonByDayRequest) {
  yield put(startAction(type));
  try {
    const lessons: Lesson[] = yield call(StudentApi.getLessonsByDay, today, tomorrow);
    // const invalidLessons: Lesson[] = yield checkLessonValid(lessons)
    // if (invalidLessons.length === 0) {
    yield put(actions.getLessonsSuccess(validateLessons(lessons)));
    // } else {
    //     yield all(invalidLessons.map((lesson: Lesson) => call(StudentApi.deleteLesson, lesson.id)))
    //     const validLessons: Lesson[] = yield call(StudentApi.getLessonsByDay, today, tomorrow)
    //     yield put(actions.getLessonsSuccess(validLessons))
    // }
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Lessons.Can not get lessons by current day.'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* createLesson({
  payload: {
    request: { duration, goal, subject },
    navigate,
  },
  type,
}: CreateLessonRequest) {
  yield put(startAction(type));
  try {
    const lesson: Lesson = yield call(StudentApi.createLesson, { subject, duration });
    yield put(
      navigateToStudyLesson({
        navigate,
        lessonId: lesson.id,
        subjectId: lesson.subject.id,
        duration: lesson.duration,
        goal,
      }),
    );
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Lessons.Can not create a lesson'),
      }),
    );
    console.error(error);
  } finally {
    yield put(stopAction(type));
  }
}

function* createGroupLesson({ type, payload }: CreateGroupLessonRequest) {
  yield put(startAction(type));
  try {
    const lesson: Lesson = yield call(StudentApi.createLesson, { ...payload.request });
    yield payload.onSuccess(lesson.id);
  } catch (e) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Lessons.Group with this name already exists'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* deleteLesson({ payload, type }: DeleteLessonRequest) {
  yield put(startAction(type));
  try {
    yield call(StudentApi.deleteLesson, payload);
  } catch (error) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Lessons.Can not delete lesson.'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getLessonsByMonth({ type, payload }: GetLessonsByMonthRequest) {
  yield put(startAction(type));
  try {
    const lessons: Lesson[] = yield call(
      StudentApi.getLessonsByDay,
      payload.today,
      payload.tomorrow,
    );
    // const invalidLessons: Lesson[] = yield checkLessonValid(lessons)
    // if (invalidLessons.length === 0) {
    yield put(actions.getLessonsByMonthSuccess(validateLessons(lessons)));
    // } else {
    //     yield all(invalidLessons.map((lesson: Lesson) => call(StudentApi.deleteLesson, lesson.id)))
    //     const validLessons: Lesson[] = yield call(StudentApi.getLessonsByDay, payload.today, payload.tomorrow)
    //     yield put(actions.getLessonsByMonthSuccess(validLessons))
    // }
    // yield put(actions.getLessonsByMonthSuccess(lessons))
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* getLessonById({ payload, type }: GetLessonByIdRequest) {
  yield put(startAction(type));
  try {
    const lesson: Lesson = yield call(StudentApi.getLessonById, payload);
    yield put(getLessonByIdSuccess(lesson));
  } catch (error) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Lessons.Can not get lesson.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* startLesson({ payload, type }: StartLessonRequest) {
  yield put(startAction(type));
  try {
    yield call(StudentApi.startLesson, payload.lessonId);
    yield put(startLessonSuccess());
    payload.onSuccess();
  } catch (e) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Lessons.Can not start the lesson'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* finishLesson({ payload, type }: FinishLessonRequest) {
  yield put(startAction(type));
  try {
    const lastLesson: FinishLessonResponse = yield call(StudentApi.finishLesson, payload.lessonId);
    yield put(finishLessonSuccess(lastLesson));
    payload.onSuccess();
  } catch (e) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Lessons.Can not start the lesson'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

function* getDefaultSessionDuration({ type }: GetDefaultSessionDurationRequest) {
  yield put(startAction(type));
  try {
    const time: number = yield call(StudentApi.getSessionTime);
    yield put(getDefaultSessionDurationSuccess(time));
  } catch (e) {
    yield put(
      showSnackbar({
        type: 'error',
        message: t('Messages.Lessons.Can not start the lesson'),
      }),
    );
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([
    takeLatest(CREATE_LESSON_REQUEST, createLesson),
    takeLatest(GET_LESSONS_REQUEST, getLessons),
    takeLatest(GET_LESSON_BY_ID_REQUEST, getLessonById),
    takeLatest(DELETE_LESSON_REQUEST, deleteLesson),
    takeLatest(GET_LESSONS_BY_DAY_REQUEST, getLessonByDay),
    takeLatest(GET_LESSONS_BY_MONTH_REQUEST, getLessonsByMonth),
    takeLatest(START_LESSON_REQUEST, startLesson),
    takeLatest(FINISH_LESSON_REQUEST, finishLesson),
    takeLatest(CREATE_GROUP_LESSON_REQUEST, createGroupLesson),
    takeLatest(GET_DEFAULT_SESSION_DURATION, getDefaultSessionDuration),
  ]);
}
