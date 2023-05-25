import { produce } from 'immer';
import {
  GET_IS_URL_BLOCKED_FOR_IFRAME_SUCCESS,
  MaterialFrameActionsType,
  MaterialFrameState,
} from './material-frame.types';

const initialState: MaterialFrameState = {
  isUrlBlockedForIFrame: {},
};

const MaterialFrameReducer = (state = initialState, action: MaterialFrameActionsType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_IS_URL_BLOCKED_FOR_IFRAME_SUCCESS:
        draft.isUrlBlockedForIFrame[action.url] = action.result;
        break;
    }
  });

export default MaterialFrameReducer;
