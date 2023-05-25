import { produce } from 'immer';
import {
  DashboardActionTypes,
  DashboardState,
  GET_CLASSMATES_SUCCESS,
  GET_STUDY_PROGRESS_SUCCESS,
} from './dashboard.types';

const initialState: DashboardState = {
  classmates: null,
  progress: null,
  mintuesStudied: null,
  statistics: null,
  stars: null,
};

const DashboardReducer = (state = initialState, action: DashboardActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_CLASSMATES_SUCCESS:
        draft.classmates = action.payload;
        break;
      case GET_STUDY_PROGRESS_SUCCESS:
        draft.progress = action.payload.progress;
        draft.mintuesStudied = action.payload.minutesStudied;
        draft.statistics = action.payload.stats;
        draft.stars = action.payload.stars;
        break;
    }
  });

export default DashboardReducer;
