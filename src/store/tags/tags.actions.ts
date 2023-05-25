import {
  CLEAR_SUGGESTIONS_TAGS,
  GET_PLACEHOLDER_TAG_REQUEST,
  GET_PLACEHOLDER_TAG_SUCCESS,
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  RESET_TAGS,
  SELECT_MAIN_TAG,
  TagsActionTypes,
} from './tags.types';
import { GetTagsByQueryRequest, PlaceholderTagRequest, Tag } from '../../entities/Tag';

export const getTagsRequest = (payload: GetTagsByQueryRequest): TagsActionTypes => ({
  type: GET_TAGS_REQUEST,
  payload,
});

export const getTagsSuccess = (payload: Tag[]): TagsActionTypes => ({
  type: GET_TAGS_SUCCESS,
  payload,
});

export const getPlaceholderTagRequest = (payload: PlaceholderTagRequest): TagsActionTypes => ({
  type: GET_PLACEHOLDER_TAG_REQUEST,
  payload,
});

export const getPlaceholderTagSuccess = (payload: string[]): TagsActionTypes => ({
  type: GET_PLACEHOLDER_TAG_SUCCESS,
  payload,
});
export const selectMainTag = (payload: string): TagsActionTypes => ({
  type: SELECT_MAIN_TAG,
  payload,
});

export const resetTags = (): TagsActionTypes => ({
  type: RESET_TAGS,
});

export const clearSuggestionsTags = (): TagsActionTypes => ({
  type: CLEAR_SUGGESTIONS_TAGS,
});
