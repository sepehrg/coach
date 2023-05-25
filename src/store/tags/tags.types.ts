import { GetTagsByQueryRequest, PlaceholderTagRequest, Tag } from '../../entities/Tag';

export const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_PLACEHOLDER_TAG_REQUEST = 'GET_PLACEHOLDER_TAG_REQUEST';
export const GET_PLACEHOLDER_TAG_SUCCESS = 'GET_PLACEHOLDER_TAG_SUCCESS';
export const SELECT_MAIN_TAG = 'SELECT_MAIN_TAG';
export const RESET_TAGS = 'RESET_TAGS';
export const CLEAR_SUGGESTIONS_TAGS = 'CLEAR_SUGGESTIONS_TAGS';

export interface TagsState {
  tags: Tag[];
  placeholderTags: string[] | undefined;
  selectedTag: string | null;
}

export interface GetTagsRequest {
  type: typeof GET_TAGS_REQUEST;
  payload: GetTagsByQueryRequest;
}

export interface SelectMainTag {
  type: typeof SELECT_MAIN_TAG;
  payload: string;
}

export interface GetTagsSuccess {
  type: typeof GET_TAGS_SUCCESS;
  payload: Tag[];
}

export interface GetPlaceholderTagRequest {
  type: typeof GET_PLACEHOLDER_TAG_REQUEST;
  payload: PlaceholderTagRequest;
}

export interface GetPlaceholderTagSuccess {
  type: typeof GET_PLACEHOLDER_TAG_SUCCESS;
  payload: string[];
}

export interface ResetTags {
  type: typeof RESET_TAGS;
}

export interface ClearSuggestionsTags {
  type: typeof CLEAR_SUGGESTIONS_TAGS;
}

export type TagsActionTypes =
  | GetTagsRequest
  | GetTagsSuccess
  | GetPlaceholderTagRequest
  | GetPlaceholderTagSuccess
  | ResetTags
  | SelectMainTag
  | ClearSuggestionsTags;
