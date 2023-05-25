export const PLAYER_START_ACTION = 'PLAYER_START_ACTION';
export const PLAYER_STOP_ACTION = 'PLAYER_STOP_ACTION';

export interface PlayerState {
  video: string;
}

export interface PlayerStartAction {
  type: typeof PLAYER_START_ACTION;
  payload: string;
}

export interface PlayerStopAction {
  type: typeof PLAYER_STOP_ACTION;
}

export type PlayerActionsType = PlayerStartAction | PlayerStopAction;
