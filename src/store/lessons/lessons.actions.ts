import { CreateGroupLesson, CreateLesson, FinishLessonResponse, Lesson } from 'entities/Lesson';
import { NavigateFunction } from 'react-router-dom';
import {
  CLEAR_SELECTED_LESSON,
  CREATE_GROUP_LESSON_REQUEST,
  CREATE_LESSON_REQUEST,
  CREATE_LESSON_SUCCESS,
  DELETE_LESSON_REQUEST,
  DELETE_LESSON_SUCCESS,
  FINISH_LESSON_REQUEST,
  FINISH_LESSON_SUCCESS,
  GET_DEFAULT_SESSION_DURATION,
  GET_DEFAULT_SESSION_DURATION_SUCCESS,
  GET_LESSON_BY_ID_REQUEST,
  GET_LESSON_BY_ID_SUCCESS,
  GET_LESSONS_BY_DAY_REQUEST,
  GET_LESSONS_BY_MONTH_REQUEST,
  GET_LESSONS_BY_MONTH_SUCCESS,
  GET_LESSONS_REQUEST,
  GET_LESSONS_SUCCESS,
  LessonsActionType,
  RESET_LESSONS,
  SELECT_GOAL,
  SELECT_LESSON,
  START_LESSON_REQUEST,
  START_LESSON_SUCCESS,
} from './lessons.types';

export const getLessonsRequest = (): LessonsActionType => ({
  type: GET_LESSONS_REQUEST,
});

export const getLessonByDayRequest = (payload: {
  today: string;
  tomorrow: string;
}): LessonsActionType => ({
  type: GET_LESSONS_BY_DAY_REQUEST,
  payload,
});

export const getLessonsSuccess = (payload: Lesson[]): LessonsActionType => ({
  type: GET_LESSONS_SUCCESS,
  payload,
});

export const getLessonByIdRequest = (payload: string): LessonsActionType => ({
  type: GET_LESSON_BY_ID_REQUEST,
  payload,
});

export const getLessonByIdSuccess = (payload: Lesson): LessonsActionType => ({
  type: GET_LESSON_BY_ID_SUCCESS,
  payload,
});

export const createLessonRequest = (payload: {
  navigate: NavigateFunction;
  request: CreateLesson;
}): LessonsActionType => ({
  type: CREATE_LESSON_REQUEST,
  payload,
});

export const createGroupLessonRequest = (payload: {
  navigate: NavigateFunction;
  request: CreateGroupLesson;
  onSuccess: (lessonId: string) => void;
}): LessonsActionType => ({
  type: CREATE_GROUP_LESSON_REQUEST,
  payload,
});

export const createLessonSuccess = (payload: Lesson): LessonsActionType => ({
  type: CREATE_LESSON_SUCCESS,
  payload,
});

export const deleteLessonRequest = (payload: string): LessonsActionType => ({
  type: DELETE_LESSON_REQUEST,
  payload,
});

export const deleteLessonSuccess = (payload: string): LessonsActionType => ({
  type: DELETE_LESSON_SUCCESS,
  payload,
});

export const selectLesson = (payload: Lesson): LessonsActionType => ({
  type: SELECT_LESSON,
  payload,
});

export const clearSelectedLesson = (): LessonsActionType => ({
  type: CLEAR_SELECTED_LESSON,
});

export const resetLessons = (): LessonsActionType => ({
  type: RESET_LESSONS,
});

export const getLessonsByMonthRequest = (payload: {
  today: string;
  tomorrow: string;
}): LessonsActionType => ({
  type: GET_LESSONS_BY_MONTH_REQUEST,
  payload,
});

export const getLessonsByMonthSuccess = (payload: Lesson[]): LessonsActionType => ({
  type: GET_LESSONS_BY_MONTH_SUCCESS,
  payload,
});

export const startLessonRequest = (payload: {
  lessonId: string;
  onSuccess: () => void;
}): LessonsActionType => ({
  type: START_LESSON_REQUEST,
  payload,
});

export const startLessonSuccess = (): LessonsActionType => ({
  type: START_LESSON_SUCCESS,
});

export const finishLessonRequest = (payload: {
  lessonId: string;
  onSuccess: () => void;
}): LessonsActionType => ({
  type: FINISH_LESSON_REQUEST,
  payload,
});

export const finishLessonSuccess = (payload: FinishLessonResponse): LessonsActionType => ({
  type: FINISH_LESSON_SUCCESS,
  payload,
});

export const selectGoal = (payload: string): LessonsActionType => ({
  type: SELECT_GOAL,
  payload,
});

export const getDefaultSessionDurationRequest = (): LessonsActionType => ({
  type: GET_DEFAULT_SESSION_DURATION,
});

export const getDefaultSessionDurationSuccess = (payload: number): LessonsActionType => ({
  type: GET_DEFAULT_SESSION_DURATION_SUCCESS,
  payload,
});
