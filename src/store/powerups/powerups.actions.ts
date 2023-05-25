import {
  PowerupsActionTypes,
  GET_POWERUPS_REQUEST,
  GET_POWERUPS_SUCCESS,
  CREATE_POWERUP_REQUEST,
  CREATE_POWERUP_SUCCESS,
  EDIT_POWERUP_REQUEST,
  EDIT_POWERUP_SUCCESS,
  SELECT_POWERUP,
  CLEAR_SELECTED_POWERUP,
  DELETE_POWERUP_REQUEST,
  DELETE_POWERUP_SUCCESS,
  GET_BREAK_POWERUP_REQUEST,
  GET_BREAK_POWERUP_SUCCESS,
} from 'store/powerups/powerups.types';
import { Powerup, PowerupCreateDto, PowerupEditDto } from 'entities/Powerup';

export const getPowerupsRequest = (): PowerupsActionTypes => ({
  type: GET_POWERUPS_REQUEST,
});

export const getPowerupsSuccess = (payload: Powerup[]): PowerupsActionTypes => ({
  type: GET_POWERUPS_SUCCESS,
  payload,
});

export const getBreakPowerupRequest = (): PowerupsActionTypes => ({
  type: GET_BREAK_POWERUP_REQUEST,
});

export const getBreakPowerupSuccess = (payload: Powerup): PowerupsActionTypes => ({
  type: GET_BREAK_POWERUP_SUCCESS,
  payload,
});

export const createPowerupReques = (payload: PowerupCreateDto): PowerupsActionTypes => ({
  type: CREATE_POWERUP_REQUEST,
  payload,
});

export const createPowerupSuccess = (payload: Powerup): PowerupsActionTypes => ({
  type: CREATE_POWERUP_SUCCESS,
  payload,
});

export const editPowerupRequest = (payload: PowerupEditDto): PowerupsActionTypes => ({
  type: EDIT_POWERUP_REQUEST,
  payload,
});

export const editPowerupSuccess = (payload: Powerup): PowerupsActionTypes => ({
  type: EDIT_POWERUP_SUCCESS,
  payload,
});

export const deletePowerupRequest = (payload: string): PowerupsActionTypes => ({
  type: DELETE_POWERUP_REQUEST,
  payload,
});

export const deletePowerupSuccess = (payload: string): PowerupsActionTypes => ({
  type: DELETE_POWERUP_SUCCESS,
  payload,
});

export const selectPowerup = (payload: Powerup): PowerupsActionTypes => ({
  type: SELECT_POWERUP,
  payload,
});

export const clearSelectedPowerup = (): PowerupsActionTypes => ({
  type: CLEAR_SELECTED_POWERUP,
});
