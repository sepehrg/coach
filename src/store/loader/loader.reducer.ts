import {
  LoaderActionsType,
  LoaderState,
  LoadingActionType,
  START_ACTION,
  STOP_ACTION,
} from './loader.types';
import { produce } from 'immer';

const initialState: LoaderState = {
  actions: [],
};

const LoaderReducer = (state = initialState, action: LoaderActionsType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case START_ACTION:
        draft.actions.push(action.payload);
        break;
      case STOP_ACTION:
        draft.actions = draft.actions.filter(
          (item: LoadingActionType) => item.name !== action.payload,
        );
        break;
    }
  });

export default LoaderReducer;
