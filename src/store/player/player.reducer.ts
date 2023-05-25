import {
  PlayerActionsType,
  PlayerState,
  PLAYER_START_ACTION,
  PLAYER_STOP_ACTION,
} from './player.types';
import { produce } from 'immer';

const initialState: PlayerState = {
  video: '',
};

const PlayerReducer = (state = initialState, action: PlayerActionsType) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PLAYER_START_ACTION:
        draft.video = action.payload;
        break;
      case PLAYER_STOP_ACTION:
        draft.video = '';
        break;
    }
  });

export default PlayerReducer;
