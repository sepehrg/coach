import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_TASK_REQUEST,
  CreateTaskRequest,
  DELETE_TASK_REQUEST,
  DeleteTaskRequest,
  EDIT_TASK_REQUEST,
  EditTaskRequest,
  GET_TASKS_REQUEST,
  GET_UPCOMING_EXAMS_REQUEST,
  GetTasksRequest,
  GetUpcomingExamsRequest,
  GET_TASK_REQUEST,
  GetTaskRequest,
  GetUpcomingByTypeRequest,
  GET_UPCOMING_BY_TYPE_REQUEST,
} from 'store/tasks/tasks.types';
import { startAction, stopAction } from 'store/loader/loader.actions';
import { showSnackbar } from 'store/snackbar/snackbar.actions';
import TasksApi from 'services/tasks.service';
import {
  createTaskSuccess,
  deleteTaskSuccess,
  editTaskSuccess,
  getTasksSuccess,
  getTaskSuccess,
  getUpcomingByTypeSuccess,
  getUpcomingExamsSuccess,
} from 'store/tasks/tasks.actions';
import { t } from 'i18next';
import { Task, TaskDto } from '../../entities/Task';

function* getTasks({ type, relativeWeek }: GetTasksRequest) {
  yield put(startAction(type));
  try {
    const tasks: TaskDto[] = yield call(TasksApi.getTasks, relativeWeek);
    yield put(getTasksSuccess(tasks));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* getTask({ type, payload }: GetTaskRequest) {
  yield put(startAction(type));
  try {
    const task: Task = yield call(TasksApi.getTask, payload);
    yield put(getTaskSuccess(task));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* getUpcomingExams({ type }: GetUpcomingExamsRequest) {
  yield put(startAction(type));
  try {
    const currentDate = new Date();
    const tasks: Task[] = yield call(TasksApi.getUpcomimgExams, currentDate);
    yield put(getUpcomingExamsSuccess(tasks));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* getUpcomingByType({ type, taskType }: GetUpcomingByTypeRequest) {
  yield put(startAction(type));
  try {
    const tasks: TaskDto[] = yield call(TasksApi.getUpcomingByTypeFlatten, taskType);
    yield put(getUpcomingByTypeSuccess(tasks, taskType));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* createTask({ type, payload }: CreateTaskRequest) {
  yield put(startAction(type));
  try {
    const task: Task = yield call(TasksApi.createTask, payload);
    yield put(createTaskSuccess(task));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* deleteTask({ type, id, taskType }: DeleteTaskRequest) {
  yield put(startAction(type));
  try {
    yield call(TasksApi.deleteTask, id);
    yield put(deleteTaskSuccess(id, taskType));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

function* editTask({ type, payload }: EditTaskRequest) {
  yield put(startAction(type));
  try {
    const task: Task = yield call(TasksApi.editTask, payload);
    yield put(editTaskSuccess(task));
  } catch (e) {
    yield put(showSnackbar({ type: 'error', message: t('Messages.Something went wrong.') }));
  } finally {
    yield put(stopAction(type));
  }
}

export default function* () {
  yield all([takeLatest(CREATE_TASK_REQUEST, createTask)]);
  yield all([takeLatest(GET_TASKS_REQUEST, getTasks)]);
  yield all([takeLatest(GET_TASK_REQUEST, getTask)]);
  yield all([takeLatest(DELETE_TASK_REQUEST, deleteTask)]);
  yield all([takeLatest(EDIT_TASK_REQUEST, editTask)]);
  yield all([takeLatest(GET_UPCOMING_EXAMS_REQUEST, getUpcomingExams)]);
  yield all([takeLatest(GET_UPCOMING_BY_TYPE_REQUEST, getUpcomingByType)]);
}
