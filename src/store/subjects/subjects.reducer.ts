import {
  CLEAR_SELECTED_SUBJECT,
  SELECT_SUBJECT,
  GET_SUBJECTS_SUCCESS,
  SubjectActionTypes,
  SubjectsState,
  GET_SUBJECT_BY_ID_SUCCESS,
} from './subjects.types';
import { produce } from 'immer';

const initialState: SubjectsState = {
  data: [],
  selectedItem: null,
};

const SubjectsReducer = (state = initialState, action: SubjectActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_SUBJECTS_SUCCESS:
        draft.data = action.payload;
        break;
      case GET_SUBJECT_BY_ID_SUCCESS:
        draft.selectedItem = action.payload;
        break;
      case SELECT_SUBJECT:
        draft.selectedItem = action.payload;
        break;
      case CLEAR_SELECTED_SUBJECT:
        draft.selectedItem = initialState.selectedItem;
        break;
    }
  });

export default SubjectsReducer;
