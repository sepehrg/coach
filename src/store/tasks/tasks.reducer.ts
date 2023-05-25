import {
  CLEAR_SELECTED,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  GET_TASKS_SUCCESS,
  GET_UPCOMING_BY_TYPE_SUCCESS,
  GET_UPCOMING_EXAMS_SUCCESS,
  SELECT_TASK,
  TasksActionTypes,
  TasksState,
} from 'store/tasks/tasks.types';

import { produce } from 'immer';

const initialState: TasksState = {
  data: [],
  upcomimgExams: [],
  upcomingByType: {},
  selectedItem: null,
  refresh: false,
};

const TasksReducer = (state = initialState, action: TasksActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_TASKS_SUCCESS:
        draft.data = action.payload;
        break;
      case GET_UPCOMING_EXAMS_SUCCESS:
        draft.upcomimgExams = action.payload;
        break;
      case GET_UPCOMING_BY_TYPE_SUCCESS:
        draft.upcomingByType = { ...state.upcomingByType, [action.taskType]: action.tasks };
        break;
      case CREATE_TASK_SUCCESS:
        draft.refresh = !state.refresh;
        break;
      case DELETE_TASK_SUCCESS:
        draft.data = state.data.filter((item) => item.id !== action.id);
        draft.upcomimgExams = state.upcomimgExams.filter((item) => item.id !== action.id);
        draft.upcomingByType = {
          ...state.upcomingByType,
          [action.taskType]: state.upcomingByType[action.taskType].filter(
            (item) => item.id !== action.id,
          ),
        };
        break;
      case SELECT_TASK:
        draft.selectedItem = action.payload;
        break;
      case CLEAR_SELECTED:
        draft.selectedItem = initialState.selectedItem;
        break;
      case EDIT_TASK_SUCCESS:
        draft.refresh = !state.refresh;
        // draft.data = draft.data.map((task) =>
        //   task.id === action.payload.id ? action.payload : task,
        // );
        break;
    }
  });

export default TasksReducer;
