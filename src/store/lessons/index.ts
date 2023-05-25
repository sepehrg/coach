import { useDispatch } from 'react-redux';
import {
  clearSelectedLesson,
  createGroupLessonRequest,
  createLessonRequest,
  deleteLessonRequest,
  finishLessonRequest,
  getDefaultSessionDurationRequest,
  getLessonByDayRequest,
  getLessonByIdRequest,
  getLessonsByMonthRequest,
  getLessonsRequest,
  resetLessons,
  selectGoal,
  selectLesson,
  startLessonRequest,
} from './lessons.actions';
import { CreateGroupLesson, CreateLesson, Lesson } from 'entities/Lesson';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export const useLessonActions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      get: () => {
        dispatch(getLessonsRequest());
      },
      startLesson: (lessonId: string, onSuccess: () => void) => {
        dispatch(startLessonRequest({ lessonId, onSuccess }));
      },
      finishLesson: (lessonId: string, onSuccess: () => void) => {
        dispatch(finishLessonRequest({ lessonId, onSuccess }));
      },
      getById: (lessonId: string) => {
        dispatch(getLessonByIdRequest(lessonId));
      },
      dispatchGetDefaultDuration: () => {
        dispatch(getDefaultSessionDurationRequest());
      },
      getByDay: ({ today, tomorrow }: { today: string; tomorrow: string }) => {
        dispatch(getLessonByDayRequest({ tomorrow, today }));
      },
      getMyMonth: ({ today, tomorrow }: { today: string; tomorrow: string }) => {
        dispatch(getLessonsByMonthRequest({ today, tomorrow }));
      },
      create: (request: CreateLesson) => {
        dispatch(createLessonRequest({ request, navigate }));
      },
      createGroup: (request: CreateGroupLesson, onSuccess: (lessonId: string) => void) => {
        dispatch(createGroupLessonRequest({ request, onSuccess, navigate }));
      },
      select: (lesson: Lesson) => {
        dispatch(selectLesson(lesson));
      },
      dispatchSelectGoal: (goal: string) => {
        dispatch(selectGoal(goal));
      },
      clearSelected: () => {
        dispatch(clearSelectedLesson());
      },
      delete: (lessonId: string) => {
        dispatch(deleteLessonRequest(lessonId));
      },
      reset: () => {
        dispatch(resetLessons());
      },
    }),
    [dispatch, navigate],
  );
};
