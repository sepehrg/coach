import { createSelector } from 'reselect';
import { RootState } from 'store/rootReducer';

export const scheduleSelector = (state: RootState) => state.schedule;
export const scheduleDataSelector = createSelector(scheduleSelector, (state) => state.data);
export const scheduleSelectedSelector = createSelector(
  scheduleSelector,
  (state) => state.selectedItem,
);
