import { Powerup, PowerupCreateDto, PowerupEditDto } from 'entities/Powerup';

export const GET_POWERUPS_REQUEST = 'GET_POWERUPS_REQUEST';
export const GET_POWERUPS_SUCCESS = 'GET_POWERUPS_SUCCESS';
export const GET_BREAK_POWERUP_REQUEST = 'GET_BREAK_POWERUP_REQUEST';
export const GET_BREAK_POWERUP_SUCCESS = 'GET_BREAK_POWERUP_SUCCESS';
export const CREATE_POWERUP_REQUEST = 'CREATE_POWERUP_REQUEST';
export const CREATE_POWERUP_SUCCESS = 'CREATE_POWERUP_SUCCESS';
export const EDIT_POWERUP_REQUEST = 'EDIT_POWERUP_REQUEST';
export const EDIT_POWERUP_SUCCESS = 'EDIT_POWERUP_SUCCESS';
export const DELETE_POWERUP_REQUEST = 'DELETE_POWERUP_REQUEST';
export const DELETE_POWERUP_SUCCESS = 'DELETE_POWERUP_SUCCESS';
export const SELECT_POWERUP = 'SELECT_POWERUP';
export const CLEAR_SELECTED_POWERUP = 'CLEAR_SELECTED_POWERUP';

export interface PowerupsState {
  data: Powerup[];
  selectedItem: Powerup | null;
}

export interface GetPowerupsRequest {
  type: typeof GET_POWERUPS_REQUEST;
}

export interface GetPowerupsSuccess {
  type: typeof GET_POWERUPS_SUCCESS;
  payload: Powerup[];
}

export interface GetBreakPowerupRequest {
  type: typeof GET_BREAK_POWERUP_REQUEST;
}

export interface GetBreakPowerupSuccess {
  type: typeof GET_BREAK_POWERUP_SUCCESS;
  payload: Powerup;
}

export interface CreatePowerupRequest {
  type: typeof CREATE_POWERUP_REQUEST;
  payload: PowerupCreateDto;
}

export interface CreatePowerupSuccess {
  type: typeof CREATE_POWERUP_SUCCESS;
  payload: Powerup;
}

export interface EditPowerupRequest {
  type: typeof EDIT_POWERUP_REQUEST;
  payload: PowerupEditDto;
}

export interface EditPowerupSuccess {
  type: typeof EDIT_POWERUP_SUCCESS;
  payload: Powerup;
}

export interface DeletePowerupRequest {
  type: typeof DELETE_POWERUP_REQUEST;
  payload: string;
}

export interface DeletePowerupSuccess {
  type: typeof DELETE_POWERUP_SUCCESS;
  payload: string;
}

export interface SelectPowerup {
  type: typeof SELECT_POWERUP;
  payload: Powerup;
}

export interface ClearSelectedPowerup {
  type: typeof CLEAR_SELECTED_POWERUP;
}

export type PowerupsActionTypes =
  | GetPowerupsRequest
  | GetPowerupsSuccess
  | GetBreakPowerupRequest
  | GetBreakPowerupSuccess
  | CreatePowerupRequest
  | CreatePowerupSuccess
  | EditPowerupRequest
  | EditPowerupSuccess
  | DeletePowerupRequest
  | DeletePowerupSuccess
  | SelectPowerup
  | ClearSelectedPowerup;
