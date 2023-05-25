import { createSelector } from 'reselect';
import { RootState } from 'store/rootReducer';

export const subjectsSelector = (state: RootState) => state.subjects;
export const subjectsDataSelector = createSelector(subjectsSelector, (state) => state.data);
export const selectedSubjectSelector = createSelector(
  subjectsSelector,
  (state) => state.selectedItem,
);
