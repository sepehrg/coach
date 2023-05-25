import { SearchResultType } from 'entities/Search';

export const SEARCH_SUBJECTS_TOPICS_REQUEST = 'SEARCH_SUBJECTS_TOPICS_REQUEST';
export const SEARCH_GROUPMATES_REQUEST = 'SEARCH_GROUPMATES_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export interface SearchState {
  query: string;
  result: SearchResultType;
}

export interface SetSearchQuery {
  type: typeof SET_SEARCH_QUERY;
  payload: string;
}

export interface SearchSubjectsTopicsRequest {
  type: typeof SEARCH_SUBJECTS_TOPICS_REQUEST;
  payload: string;
}

export interface SearchGroupMatesRequest {
  type: typeof SEARCH_GROUPMATES_REQUEST;
  payload: string;
}

export interface SearchSuccess {
  type: typeof SEARCH_SUCCESS;
  payload: SearchResultType;
}

export interface ClearSearch {
  type: typeof CLEAR_SEARCH;
}

export type SearchActionsType =
  | SetSearchQuery
  | SearchSubjectsTopicsRequest
  | SearchGroupMatesRequest
  | SearchSuccess
  | ClearSearch;
