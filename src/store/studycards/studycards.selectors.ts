import { RootState } from '../rootReducer';
import { createSelector } from 'reselect';

export const studyCardsSelector = (state: RootState) => state.studycards;
export const newSetSubjectSelector = createSelector(
  studyCardsSelector,
  (state) => state.newSetSubject,
);
export const studyCardsSelectedSubjectSelector = createSelector(
  studyCardsSelector,
  (state) => state.selectedSubject,
);
export const setsSubjectsSelector = createSelector(
  studyCardsSelector,
  (state) => state.setsSubjects,
);
export const unsortedCountSelector = createSelector(
  studyCardsSelector,
  (state) => state.unsortedCount,
);
export const unsortedCardsSelector = createSelector(
  studyCardsSelector,
  (state) => state.unsortedCards,
);
export const setsSelector = createSelector(studyCardsSelector, (state) => state.sets);
export const setsPageCountSelector = createSelector(studyCardsSelector, (state) => state.pageCount);
export const setsPageSelector = createSelector(studyCardsSelector, (state) => state.page);
export const setsCountSelector = createSelector(studyCardsSelector, (state) => state.total);
export const studyCardsTagsSelector = createSelector(studyCardsSelector, (state) => state.tags);
export const setDetailsSelector = createSelector(studyCardsSelector, (state) => state.setData);
export const learningSetOverviewSelector = createSelector(
  studyCardsSelector,
  (state) => state.learningSetOverview,
);
export const sessionCardsSelector = createSelector(
  studyCardsSelector,
  (state) => state.sessionData,
);
export const savedSetIndexSelector = createSelector(studyCardsSelector, (state) => state.setIndex);
export const timerSelector = createSelector(studyCardsSelector, (state) => state.timer);
