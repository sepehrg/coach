import { IdoActionTypes } from 'entities/Ido';
import { produce } from 'immer';
import {
  GET_GREETING_SUCCESS,
  GET_IDO_ACTION_SUCCESS,
  IdoActionTypes as IdoActionStoreType,
  IdoState,
  REMOVE_ALL_MESSAGES,
  REMOVE_GREETING,
} from './ido.types';

const initialState: IdoState = {
  idoActions: [],
};

const IdoReducer = (state = initialState, action: IdoActionStoreType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_GREETING_SUCCESS:
        draft.idoActions = [...(state.idoActions || []), { ...action.payload, time: new Date() }];
        break;
      case GET_IDO_ACTION_SUCCESS:
        draft.idoActions = [...(state.idoActions || []), { ...action.payload, time: new Date() }];
        break;
      case REMOVE_GREETING:
        draft.idoActions = state.idoActions.filter(
          (action) => action.type !== IdoActionTypes.GREETING,
        );
        break;
      case REMOVE_ALL_MESSAGES:
        draft.idoActions = state.idoActions.filter(
          (action) => action.type === IdoActionTypes.GREETING,
        );
        break;
    }
  });

export default IdoReducer;
