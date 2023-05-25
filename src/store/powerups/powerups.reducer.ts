import {
  PowerupsState,
  PowerupsActionTypes,
  GET_POWERUPS_SUCCESS,
  CREATE_POWERUP_SUCCESS,
  EDIT_POWERUP_SUCCESS,
  DELETE_POWERUP_SUCCESS,
  SELECT_POWERUP,
  CLEAR_SELECTED_POWERUP,
  GET_BREAK_POWERUP_SUCCESS,
} from 'store/powerups/powerups.types';
import { produce } from 'immer';

const initialState: PowerupsState = {
  data: [],
  selectedItem: null,
};

const PowerupReducer = (state = initialState, action: PowerupsActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_POWERUPS_SUCCESS:
        draft.data = action.payload;
        break;
      case CREATE_POWERUP_SUCCESS:
        draft.data.push(action.payload);
        break;
      case EDIT_POWERUP_SUCCESS:
        draft.data = draft.data.map((powerup) =>
          powerup.id === action.payload.id ? action.payload : powerup,
        );
        break;
      case DELETE_POWERUP_SUCCESS:
        draft.data = draft.data.filter((item) => item.id !== action.payload);
        break;
      case GET_BREAK_POWERUP_SUCCESS:
      case SELECT_POWERUP:
        draft.selectedItem = action.payload;
        break;
      case CLEAR_SELECTED_POWERUP:
        draft.selectedItem = initialState.selectedItem;
        break;
    }
  });

export default PowerupReducer;
