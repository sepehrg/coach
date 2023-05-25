import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import {
  clearSuggestionsTags,
  getPlaceholderTagRequest,
  getTagsRequest,
  resetTags,
  selectMainTag,
} from './tags.actions';
import { GetTagsByQueryRequest, PlaceholderTagRequest } from '../../entities/Tag';

export const useTagsActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      getPlaceholderTag: (payload: PlaceholderTagRequest) => {
        dispatch(getPlaceholderTagRequest(payload));
      },
      getTagsByQuery: (payload: GetTagsByQueryRequest) => {
        dispatch(getTagsRequest(payload));
      },
      dispatchSelectMainTag: (payload: string) => {
        dispatch(selectMainTag(payload));
      },
      dispatchClearSuggestionsTags: () => {
        dispatch(clearSuggestionsTags());
      },
      resetTags: () => {
        dispatch(resetTags());
      },
    }),
    [dispatch],
  );
};
