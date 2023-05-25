import { produce } from 'immer';
import {
  CLEAR_SELECTED_LESSON,
  CREATE_LESSON_SUCCESS,
  FINISH_LESSON_SUCCESS,
  GET_DEFAULT_SESSION_DURATION_SUCCESS,
  GET_LESSON_BY_ID_SUCCESS,
  GET_LESSONS_BY_MONTH_SUCCESS,
  GET_LESSONS_SUCCESS,
  LessonsActionType,
  LessonsState,
  RESET_LESSONS,
  SELECT_GOAL,
  SELECT_LESSON,
  START_LESSON_SUCCESS,
} from './lessons.types';

const initialState: LessonsState = {
  data: [],
  rangeData: [],
  selectedItem: null,
  lastLesson: null,
  selectedGoal: null,
  defaultSessionTime: null,
};

const LessonsReducer = (state = initialState, action: LessonsActionType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_LESSONS_SUCCESS:
        draft.data = action.payload || [];
        break;
      case CREATE_LESSON_SUCCESS:
        draft.selectedItem = action.payload;
        break;
      case SELECT_LESSON:
        draft.selectedItem = action.payload;
        break;
      case CLEAR_SELECTED_LESSON:
        draft.selectedItem = null;
        break;
      case GET_LESSONS_BY_MONTH_SUCCESS:
        draft.rangeData = action.payload;
        break;
      case GET_LESSON_BY_ID_SUCCESS:
        draft.selectedItem = action.payload;
        break;
      case GET_DEFAULT_SESSION_DURATION_SUCCESS:
        draft.defaultSessionTime = action.payload;
        break;
      case START_LESSON_SUCCESS:
        if (draft.selectedItem) {
          draft.selectedItem.startedAt = new Date();
        }
        break;
      case FINISH_LESSON_SUCCESS:
        draft.lastLesson = action.payload;
        break;
      case SELECT_GOAL:
        draft.selectedGoal = action.payload;
        break;
      case RESET_LESSONS:
        draft.data = initialState.data;
        draft.rangeData = initialState.rangeData;
        draft.selectedItem = initialState.selectedItem;
        draft.lastLesson = initialState.lastLesson;
        break;
    }
  });

export default LessonsReducer;
