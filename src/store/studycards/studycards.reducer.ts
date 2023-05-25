import { produce } from 'immer';
import {
  CHANGE_PAGE,
  CLEAR_SELECTED_SUBJECT,
  CLEAR_SET_INDEX,
  CLEAR_SIDEBAR_SUBJECT,
  CLEAR_STUDY_CARDS,
  GET_DISCOVER_SETS_BY_SUBJECT_SUCCESS,
  GET_DISCOVER_STUDY_CARD_SETS_SUCCESS,
  GET_GENERAL_KNOWLEDGE_BY_SUBJECT_SUCCESS,
  GET_GENERAL_KNOWLEDGE_SETS_SUCCESS,
  GET_LEARNING_SET_OVERVIEW_SUCCESS,
  GET_LIBRARY_SETS_BY_SUBJECT_SUCCESS,
  GET_LIBRARY_STUDY_CARD_SETS_SUCCESS,
  GET_SESSION_CARDS_ALL_SUCCESS,
  GET_SESSION_CARDS_BY_LEVEL_SUCCESS,
  GET_SET_SUCCESS,
  GET_UNSORTED_CARDS_SUCCESS,
  SAVE_SET_INDEX,
  SEARCH_TAGS_SUCCESS,
  SELECT_NEW_SET_SUBJECT,
  SELECT_STUDY_CARDS_SUBJECT,
  StudyCardsActionTypes,
  StudyCardsState,
  UPDATE_TIMER,
} from './studycards.types';

const initialState: StudyCardsState = {
  newSetSubject: null,
  selectedSubject: null,
  sets: null,
  setsSubjects: null,
  unsortedCount: 0,
  unsortedCards: null,
  page: 1,
  total: 0,
  pageCount: 1,
  tags: undefined,
  setData: null,
  learningSetOverview: null,
  sessionData: null,
  setIndex: null,
  timer: -1,
};

const StudyCardsReducer = (state = initialState, action: StudyCardsActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SELECT_NEW_SET_SUBJECT:
        draft.newSetSubject = action.payload;
        break;
      case SELECT_STUDY_CARDS_SUBJECT:
        draft.selectedSubject = action.payload;
        break;
      case GET_LIBRARY_STUDY_CARD_SETS_SUCCESS:
        draft.setsSubjects = action.payload.subjectCount;
        draft.unsortedCount = action.payload.unsortedCount;
        break;
      case GET_LIBRARY_SETS_BY_SUBJECT_SUCCESS:
        draft.sets = action.payload.data;
        draft.pageCount = action.payload.pageCount;
        draft.total = action.payload.total;
        break;
      case GET_DISCOVER_STUDY_CARD_SETS_SUCCESS:
        draft.setsSubjects = action.payload;
        break;
      case GET_DISCOVER_SETS_BY_SUBJECT_SUCCESS:
        draft.sets = action.payload.data;
        draft.pageCount = action.payload.pageCount;
        draft.total = action.payload.total;
        break;
      case SEARCH_TAGS_SUCCESS:
        draft.tags = action.payload;
        break;
      case GET_SET_SUCCESS:
        draft.setData = action.payload;
        break;
      case GET_LEARNING_SET_OVERVIEW_SUCCESS:
        draft.learningSetOverview = action.payload;
        break;
      case GET_SESSION_CARDS_ALL_SUCCESS:
        draft.sessionData = action.payload;
        break;
      case GET_SESSION_CARDS_BY_LEVEL_SUCCESS:
        draft.sessionData = action.payload;
        break;
      case GET_GENERAL_KNOWLEDGE_SETS_SUCCESS:
        draft.setsSubjects = action.payload;
        break;
      case GET_GENERAL_KNOWLEDGE_BY_SUBJECT_SUCCESS:
        draft.sets = action.payload.data;
        draft.pageCount = action.payload.pageCount;
        draft.total = action.payload.total;
        break;
      case GET_UNSORTED_CARDS_SUCCESS:
        draft.unsortedCards = action.payload;
        break;
      case SAVE_SET_INDEX:
        draft.setIndex = action.payload.index;
        break;
      case CLEAR_SELECTED_SUBJECT:
        draft.selectedSubject = initialState.newSetSubject;
        break;
      case CHANGE_PAGE:
        draft.page = action.payload;
        break;
      case CLEAR_SET_INDEX:
        draft.setIndex = initialState.setIndex;
        break;
      case CLEAR_SIDEBAR_SUBJECT:
        draft.selectedSubject = initialState.selectedSubject;
        break;
      case CLEAR_STUDY_CARDS:
        draft.newSetSubject = initialState.newSetSubject;
        draft.selectedSubject = initialState.selectedSubject;
        draft.sets = initialState.sets;
        draft.setsSubjects = initialState.setsSubjects;
        draft.page = initialState.page;
        draft.total = initialState.total;
        draft.pageCount = initialState.pageCount;
        draft.tags = initialState.tags;
        draft.setData = initialState.setData;
        break;
      case UPDATE_TIMER:
        draft.timer = action.payload.timer;
        break;
    }
  });

export default StudyCardsReducer;
