import { IdoAction, IdoActionRequest } from 'entities/Ido';
import {
  GET_GREETING_REQUEST,
  GET_GREETING_SUCCESS,
  GET_IDO_ACTION_REQUEST,
  GET_IDO_ACTION_SUCCESS,
  IdoActionTypes,
  REMOVE_ALL_MESSAGES,
  REMOVE_GREETING,
} from './ido.types';

export const getGreeting = (): IdoActionTypes => ({
  type: GET_GREETING_REQUEST,
});

export const getGreetingSuccess = (payload: IdoAction): IdoActionTypes => ({
  type: GET_GREETING_SUCCESS,
  payload,
});

export const getIdoActionRequest = (payload: IdoActionRequest): IdoActionTypes => ({
  type: GET_IDO_ACTION_REQUEST,
  payload,
});

export const getIdoActionSuccess = (payload: IdoAction): IdoActionTypes => ({
  type: GET_IDO_ACTION_SUCCESS,
  payload,
});

export const removeGreeting = (): IdoActionTypes => ({
  type: REMOVE_GREETING,
});

export const removeAllMessages = (): IdoActionTypes => ({
  type: REMOVE_ALL_MESSAGES,
});
