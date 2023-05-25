import { CreateGroupLesson, CreateLesson, FinishLessonResponse, Lesson } from 'entities/Lesson';
import { NavigateFunction } from 'react-router-dom';

export const GET_LESSONS_REQUEST = 'GET_LESSONS_REQUEST';
export const GET_LESSONS_BY_DAY_REQUEST = 'GET_LESSONS_BY_DAY_REQUEST';
export const GET_LESSONS_SUCCESS = 'SET_LESSONS_SUCCESS';
export const GET_LESSON_BY_ID_REQUEST = 'GET_LESSON_BY_ID_REQUEST';
export const GET_LESSON_BY_ID_SUCCESS = 'GET_LESSON_BY_ID_SUCCESS';
export const GET_DEFAULT_SESSION_DURATION = 'GET_DEFAULT_SESSION_DURATION';
export const GET_DEFAULT_SESSION_DURATION_SUCCESS = 'GET_DEFAULT_SESSION_DURATION_SUCCESS';
export const CREATE_LESSON_REQUEST = 'CREATE_LESSON_REQUEST';
export const CREATE_LESSON_SUCCESS = 'CREATE_LESSON_SUCCESS';
export const CREATE_GROUP_LESSON_REQUEST = 'CREATE_GROUP_LESSON_REQUEST';
export const DELETE_LESSON_REQUEST = 'DELETE_LESSON_REQUEST';
export const DELETE_LESSON_SUCCESS = 'DELETE_LESSON_SUCCESS';
export const SELECT_LESSON = 'LESSONS_SELECT_LESSON';
export const CLEAR_SELECTED_LESSON = 'LESSONS_CLEAR_SELECTED_LESSON';
export const RESET_LESSONS = 'LESSONS_RESET_LESSONS';
export const GET_LESSONS_BY_MONTH_REQUEST = 'GET_LESSONS_BY_MONTH_REQUEST';
export const GET_LESSONS_BY_MONTH_SUCCESS = 'GET_LESSONS_BY_MONTH_SUCCESS';
export const START_LESSON_REQUEST = 'START_LESSON_REQUEST';
export const START_LESSON_SUCCESS = 'START_LESSON_SUCCESS';
export const FINISH_LESSON_REQUEST = 'FINISH_LESSON_REQUEST';
export const FINISH_LESSON_SUCCESS = 'FINISH_LESSON_SUCCESS';
export const SELECT_GOAL = 'SELECT_GOAL';

export interface LessonsState {
  data: Lesson[];
  rangeData: Lesson[];
  selectedItem: Lesson | null;
  lastLesson: FinishLessonResponse | null;
  selectedGoal: string | null;
  defaultSessionTime: number | null;
}

export interface GetLessonsRequest {
  type: typeof GET_LESSONS_REQUEST;
}

export interface GetLessonByDayRequest {
  type: typeof GET_LESSONS_BY_DAY_REQUEST;
  payload: { today: string; tomorrow: string };
}

export interface GetLessonsSuccess {
  type: typeof GET_LESSONS_SUCCESS;
  payload: Lesson[];
}

export interface GetLessonByIdRequest {
  type: typeof GET_LESSON_BY_ID_REQUEST;
  payload: string;
}

export interface GetLessonByIdSuccess {
  type: typeof GET_LESSON_BY_ID_SUCCESS;
  payload: Lesson;
}

export interface GetDefaultSessionDurationRequest {
  type: typeof GET_DEFAULT_SESSION_DURATION;
}

export interface GetDefaultSessionDurationSuccess {
  type: typeof GET_DEFAULT_SESSION_DURATION_SUCCESS;
  payload: number;
}

export interface CreateLessonRequest {
  type: typeof CREATE_LESSON_REQUEST;
  payload: { navigate: NavigateFunction; request: CreateLesson };
}

export interface CreateGroupLessonRequest {
  type: typeof CREATE_GROUP_LESSON_REQUEST;
  payload: {
    navigate: NavigateFunction;
    request: CreateGroupLesson;
    onSuccess: (lessonId: string) => void;
  };
}

export interface SelectLessonAction {
  type: typeof SELECT_LESSON;
  payload: Lesson;
}

export interface ClearSelectedLessonAction {
  type: typeof CLEAR_SELECTED_LESSON;
}

export interface DeleteLessonRequest {
  type: typeof DELETE_LESSON_REQUEST;
  payload: string;
}

export interface DeleteLessonSuccess {
  type: typeof DELETE_LESSON_SUCCESS;
  payload: string;
}

export interface CreateLessonSuccess {
  type: typeof CREATE_LESSON_SUCCESS;
  payload: Lesson;
}

export interface ResetLessonsAction {
  type: typeof RESET_LESSONS;
}

export interface GetLessonsByMonthRequest {
  type: typeof GET_LESSONS_BY_MONTH_REQUEST;
  payload: { today: string; tomorrow: string };
}

export interface GetLessonsByMonthSuccess {
  type: typeof GET_LESSONS_BY_MONTH_SUCCESS;
  payload: Lesson[];
}

export interface StartLessonRequest {
  type: typeof START_LESSON_REQUEST;
  payload: { lessonId: string; onSuccess: () => void };
}

export interface StartLessonSuccess {
  type: typeof START_LESSON_SUCCESS;
}

export interface FinishLessonRequest {
  type: typeof FINISH_LESSON_REQUEST;
  payload: { lessonId: string; onSuccess: () => void };
}

export interface FinishLessonSuccess {
  type: typeof FINISH_LESSON_SUCCESS;
  payload: FinishLessonResponse;
}

export interface SelectGoal {
  type: typeof SELECT_GOAL;
  payload: string;
}

export type LessonsActionType =
  | GetLessonsRequest
  | GetLessonsSuccess
  | GetLessonByIdRequest
  | GetLessonByIdSuccess
  | CreateLessonRequest
  | CreateGroupLessonRequest
  | CreateLessonSuccess
  | ResetLessonsAction
  | DeleteLessonRequest
  | DeleteLessonSuccess
  | SelectLessonAction
  | ClearSelectedLessonAction
  | GetLessonByDayRequest
  | GetLessonsByMonthRequest
  | GetLessonsByMonthSuccess
  | StartLessonRequest
  | StartLessonSuccess
  | FinishLessonRequest
  | FinishLessonSuccess
  | SelectGoal
  | GetDefaultSessionDurationRequest
  | GetDefaultSessionDurationSuccess;
