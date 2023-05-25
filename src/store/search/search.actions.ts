import { SearchResultType } from 'entities/Search';
import {
  CLEAR_SEARCH,
  SEARCH_GROUPMATES_REQUEST,
  SEARCH_SUBJECTS_TOPICS_REQUEST,
  SEARCH_SUCCESS,
  SearchActionsType,
  SET_SEARCH_QUERY,
} from './search.types';

export const setSearchQuery = (payload: string): SearchActionsType => ({
  type: SET_SEARCH_QUERY,
  payload,
});

export const searchSubjectsTopics = (payload: string): SearchActionsType => ({
  type: SEARCH_SUBJECTS_TOPICS_REQUEST,
  payload,
});

export const searchGroupmatesRequest = (payload: string): SearchActionsType => ({
  type: SEARCH_GROUPMATES_REQUEST,
  payload,
});

export const searchSuccess = (payload: SearchResultType): SearchActionsType => ({
  type: SEARCH_SUCCESS,
  payload,
});

export const clearSearch = (): SearchActionsType => ({
  type: CLEAR_SEARCH,
});
