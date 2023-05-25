export const GET_SCHEDULE_REQUEST = 'GET_SCHEDULE_REQUEST';
export const GET_SCHEDULE_SUCCESS = 'GET_SCHEDULE_SUCCESS';
export const CREATE_SCHEDULE_REQUEST = 'CREATE_SCHEDULE_REQUEST';
export const CREATE_SCHEDULE_SUCCESS = 'CREATE_SCHEDULE_SUCCESS';
export const DELETE_SCHEDULE_REQUEST = 'DELETE_SCHEDULE_REQUEST';
export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS';
export const FINISH_SCHEDULE_REQUEST = 'FINISH_SCHEDULE_REQUEST';
export const FINISH_SCHEDULE_SUCCESS = 'FINISH_SCHEDULE_SUCCESS';
export const SELECT_SCHEDULE = 'SELECT_SCHEDULE';
export const CLEAR_SELECTED_SCHEDULE = 'CLEAR_SELECTED_SCHEDULE';

export interface ScheduleState {
  data: any[];
  selectedItem: any | null;
}

export interface GetScheduleRequest {
  type: typeof GET_SCHEDULE_REQUEST;
}

export interface GetScheduleSuccess {
  type: typeof GET_SCHEDULE_SUCCESS;
  payload: any;
}

export interface CreateScheduleRequest {
  type: typeof CREATE_SCHEDULE_REQUEST;
  payload: any;
}

export interface CreateScheduleSuccess {
  type: typeof CREATE_SCHEDULE_SUCCESS;
  payload: any;
}

export interface DeleteScheduleRequest {
  type: typeof DELETE_SCHEDULE_REQUEST;
  payload: string;
}

export interface DeleteScheduleSuccess {
  type: typeof DELETE_SCHEDULE_SUCCESS;
  payload: string;
}

export interface FinishScheduleRequest {
  type: typeof FINISH_SCHEDULE_REQUEST;
  payload: string;
}

export interface FinishScheduleSuccess {
  type: typeof FINISH_SCHEDULE_SUCCESS;
  payload: string;
}

export interface SelectSchedule {
  type: typeof SELECT_SCHEDULE;
  payload: any;
}

export interface ClearSelectedSchedule {
  type: typeof CLEAR_SELECTED_SCHEDULE;
}

export type ScheduleActionTypes =
  | GetScheduleRequest
  | GetScheduleSuccess
  | CreateScheduleRequest
  | CreateScheduleSuccess
  | DeleteScheduleRequest
  | DeleteScheduleSuccess
  | FinishScheduleRequest
  | FinishScheduleSuccess
  | SelectSchedule
  | ClearSelectedSchedule;
