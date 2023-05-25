import {
  CHOOSE_GRADES,
  GET_GRADES_SUCCESS,
  GradesActionType,
  GradesState,
  RESET_GRADES,
} from './grade.types';
import { produce } from 'immer';

const initialState: GradesState = {
  data: [],
  chosenGrades: undefined,
};

const GradesReducer = (state = initialState, action: GradesActionType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_GRADES_SUCCESS:
        draft.data = action.payload;
        break;
      case CHOOSE_GRADES:
        draft.chosenGrades = action.payload;
        break;
      case RESET_GRADES:
        draft.data = initialState.data;
        break;
    }
  });

export default GradesReducer;
