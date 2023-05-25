import { produce } from 'immer';
import {
  CHANGE_PAGE,
  CLEAR_SELECTED_MATERIAL,
  FILTER_MATERIALS,
  GET_MATERIALS_HISTORY_SUCCESS,
  GET_MATERIALS_LINKS_SUCCESS,
  GET_MATERIALS_SUCCESS,
  GET_MATERIALS_TOPICS_SUCCESS,
  MaterialsActionTypes,
  MaterialsState,
  RESET_MATERIAL,
  SELECT_MATERIAL,
} from './materials.types';

const initialState: MaterialsState = {
  data: [],
  selectedItem: null,
  topics: [],
  allMaterialsLinks: [],
  materialsHistory: [],
  relatedTags: [],
  page: 1,
  historyPageCount: 0,
  filteredMaterialType: null,
};

const MaterialsReducer = (state = initialState, action: MaterialsActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_MATERIALS_SUCCESS:
        draft.data = action.payload || [];
        break;
      case GET_MATERIALS_TOPICS_SUCCESS:
        draft.topics = action.payload;
        break;
      case GET_MATERIALS_LINKS_SUCCESS:
        draft.allMaterialsLinks = action.payload.materials;
        if (action.payload.relatedTags) {
          draft.relatedTags = action.payload.relatedTags;
        }
        break;
      case SELECT_MATERIAL:
        draft.selectedItem = action.payload;
        break;
      case CHANGE_PAGE:
        draft.page = action.payload;
        break;
      case CLEAR_SELECTED_MATERIAL:
        draft.selectedItem = initialState.selectedItem;
        break;
      case RESET_MATERIAL:
        draft.selectedItem = initialState.selectedItem;
        draft.data = initialState.data;
        draft.topics = initialState.topics;
        draft.allMaterialsLinks = initialState.allMaterialsLinks;
        draft.relatedTags = initialState.relatedTags;
        draft.page = initialState.page;
        break;
      case GET_MATERIALS_HISTORY_SUCCESS:
        draft.materialsHistory = action.payload.materialHistory;
        draft.historyPageCount = action.payload.pageCount;
        draft.page = action.payload.page;
        break;
      case FILTER_MATERIALS:
        draft.filteredMaterialType = action.learningType;
        draft.page = 1;
        break;
    }
  });

export default MaterialsReducer;
