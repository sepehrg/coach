import { produce } from 'immer';
import {
  StudyNotesActionTypes,
  StudyNotesState,
  GET_STUDY_NOTE_SUCCESS,
  GET_FAVORITE_STUDY_NOTES_SUCCESS,
  GET_STUDY_NOTE_OVERVIEW_SUCCESS,
} from './studyNotes.types';

const initialState: StudyNotesState = {
  studyNote: [],
  overviewStudyNotes: [],
  favoriteStudyNotes: [],
};

const StudyNotesReducer = (state = initialState, action: StudyNotesActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_STUDY_NOTE_SUCCESS:
        draft.studyNote = action.payload;
        break;
      case GET_FAVORITE_STUDY_NOTES_SUCCESS:
        draft.favoriteStudyNotes = action.payload;
        break;
      case GET_STUDY_NOTE_OVERVIEW_SUCCESS:
        draft.overviewStudyNotes = action.payload;
        break;
    }
  });

export default StudyNotesReducer;
