import { produce } from 'immer';
import {
  CLEAR_SUGGESTIONS_TAGS,
  GET_PLACEHOLDER_TAG_SUCCESS,
  GET_TAGS_SUCCESS,
  RESET_TAGS,
  SELECT_MAIN_TAG,
  TagsActionTypes,
  TagsState,
} from './tags.types';

const initialState: TagsState = {
  tags: [],
  placeholderTags: undefined,
  selectedTag: null,
};

const TagsReducer = (state = initialState, action: TagsActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_PLACEHOLDER_TAG_SUCCESS:
        draft.placeholderTags = action.payload;
        break;
      case GET_TAGS_SUCCESS:
        draft.tags = action.payload;
        break;
      case SELECT_MAIN_TAG:
        draft.selectedTag = action.payload;
        break;
      case CLEAR_SUGGESTIONS_TAGS:
        draft.tags = initialState.tags;
        break;
      case RESET_TAGS:
        draft.tags = initialState.tags;
        draft.selectedTag = initialState.selectedTag;
        draft.placeholderTags = initialState.placeholderTags;
        break;
    }
  });

export default TagsReducer;
