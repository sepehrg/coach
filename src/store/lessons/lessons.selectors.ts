import { createSelector } from 'reselect';
import { LessonsState } from 'store/lessons/lessons.types';
import { RootState } from '../rootReducer';

export const lessonsSelector = (state: RootState) => state.lessons;
export const selectedLessonSelector = createSelector(
  lessonsSelector,
  (state: LessonsState) => state.selectedItem,
);
export const dataLessonsSelector = (state: RootState) => state.lessons.data;
export const rangeLessonsSelector = (state: RootState) => state.lessons.rangeData;
export const goalSelector = (state: RootState) => state.lessons.selectedGoal;
export const defaultSessionTimeSelector = (state: RootState) => state.lessons.defaultSessionTime;
