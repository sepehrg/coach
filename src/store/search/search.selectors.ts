import { createSelector } from 'reselect';
import { RootState } from 'store/rootReducer';
import { SearchState } from 'store/search/search.types';

export const searchSelector = (state: RootState) => state.search;
export const searchResultSelector = createSelector(searchSelector, (state) => state.result);
export const searchQuerySelector = createSelector(
  searchSelector,
  (state: SearchState) => state.query,
);
