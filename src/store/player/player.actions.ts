import { PlayerActionsType, PLAYER_START_ACTION, PLAYER_STOP_ACTION } from './player.types';

export const playerStartAction = (video: string): PlayerActionsType => ({
  type: PLAYER_START_ACTION,
  payload: video,
});

export const playerStopAction = (): PlayerActionsType => ({
  type: PLAYER_STOP_ACTION,
});
