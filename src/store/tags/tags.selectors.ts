import { RootState } from 'store/rootReducer';

export const placeholderTagsSelector = (state: RootState) => state.tags.placeholderTags;
export const tagsArraySelector = (state: RootState) => state.tags.tags;
export const selectedMainTagSelector = (state: RootState) => state.tags.selectedTag;
