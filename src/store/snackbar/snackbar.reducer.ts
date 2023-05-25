import { HIDE_SNACKBAR, SHOW_SNACKBAR, SnackbarActionsType, SnackbarState } from './snackbar.types';
import { produce } from 'immer';

const initialState: SnackbarState = {
  isOpen: false,
  type: '',
  message: '',
};

const SnackbarReducer = (state = initialState, action: SnackbarActionsType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SHOW_SNACKBAR:
        draft.isOpen = true;
        draft.type = action.payload.type;
        draft.message = action.payload.message;
        break;
      case HIDE_SNACKBAR:
        draft.isOpen = false;
        draft.message = '';
        draft.type = '';
        break;
    }
  });

export default SnackbarReducer;
