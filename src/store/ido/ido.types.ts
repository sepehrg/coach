import { IdoAction, IdoActionRequest } from 'entities/Ido';

export const GET_GREETING_REQUEST = 'GET_GREETING_REQUEST';
export const GET_GREETING_SUCCESS = 'GET_GREETING_SUCCESS';
export const GET_AFFIRMATION_REQUEST = 'GET_AFFIRMATION_REQUEST';
export const GET_AFFIRMATION_SUCCESS = 'GET_AFFIRMATION_SUCCESS';
export const GET_MOTIVATION_REQUEST = 'GET_MOTIVATION_REQUEST';
export const GET_MOTIVATION_SUCCESS = 'GET_MOTIVATION_SUCCESS';
export const GET_REMINDER_REQUEST = 'GET_REMINDER_REQUEST';
export const GET_REMINDER_SUCCESS = 'GET_REMINDER_SUCCESS';
export const GET_SUBJECT_ADVICE_REQUEST = 'GET_SUBJECT_ADVICE_REQUEST';
export const GET_SUBJECT_ADVICE_SUCCESS = 'GET_SUBJECT_ADVICE_SUCCESS';
export const GET_FOCUSTIME_TIP_REQUEST = 'GET_FOCUSTIME_TIP_REQUEST';
export const GET_FOCUSTIME_TIP_SUCCESS = 'GET_FOCUSTIME_TIP_SUCCESS';
export const REMOVE_GREETING = 'REMOVE_GREETING';
export const REMOVE_ALL_MESSAGES = 'REMOVE_ALL_MESSAGES';
export const GET_IDO_ACTION_REQUEST = 'GET_IDO_ACTION_REQUEST';
export const GET_IDO_ACTION_SUCCESS = 'GET_IDO_ACTION_SUCCESS';

export interface IdoState {
  idoActions: IdoAction[];
}

export interface GetGreetingRequest {
  type: typeof GET_GREETING_REQUEST;
}

export interface GetGreetingSuccess {
  type: typeof GET_GREETING_SUCCESS;
  payload: IdoAction;
}

export interface GetIdoActionRequest {
  type: typeof GET_IDO_ACTION_REQUEST;
  payload: IdoActionRequest;
}

export interface GetIdoActionSuccess {
  type: typeof GET_IDO_ACTION_SUCCESS;
  payload: IdoAction;
}

export interface RemoveGreeting {
  type: typeof REMOVE_GREETING;
}

export interface RemoveAllMessages {
  type: typeof REMOVE_ALL_MESSAGES;
}

export type IdoActionTypes =
  | GetGreetingRequest
  | GetGreetingSuccess
  | GetIdoActionRequest
  | GetIdoActionSuccess
  | RemoveGreeting
  | RemoveAllMessages;
