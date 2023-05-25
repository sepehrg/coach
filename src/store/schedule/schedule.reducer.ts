import { produce } from 'immer';
import {
  CLEAR_SELECTED_SCHEDULE,
  CREATE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_SUCCESS,
  FINISH_SCHEDULE_SUCCESS,
  GET_SCHEDULE_SUCCESS,
  ScheduleActionTypes,
  ScheduleState,
  SELECT_SCHEDULE,
} from 'store/schedule/schedule.types';

const initialState: ScheduleState = {
  data: [],
  selectedItem: null,
};

const ScheduleReducer = (state = initialState, action: ScheduleActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_SCHEDULE_SUCCESS:
        draft.data = action.payload;
        break;
      case CREATE_SCHEDULE_SUCCESS:
        draft.data.push(action.payload);
        break;
      case SELECT_SCHEDULE:
        draft.selectedItem = action.payload;
        break;
      case CLEAR_SELECTED_SCHEDULE:
        draft.selectedItem = initialState.selectedItem;
        break;
      case FINISH_SCHEDULE_SUCCESS:
      case DELETE_SCHEDULE_SUCCESS:
        draft.data = draft.data.filter((item) => item.id !== action.payload);
        break;
    }
  });

export default ScheduleReducer;
