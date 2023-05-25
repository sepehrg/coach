import {
  CLEAR_SELECTED_SCHEDULE,
  CREATE_SCHEDULE_REQUEST,
  CREATE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_REQUEST,
  FINISH_SCHEDULE_REQUEST,
  FINISH_SCHEDULE_SUCCESS,
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  ScheduleActionTypes,
  SELECT_SCHEDULE,
} from 'store/schedule/schedule.types';

export const getScheduleRequest = (): ScheduleActionTypes => ({
  type: GET_SCHEDULE_REQUEST,
});

export const getScheduleSuccess = (payload: any): ScheduleActionTypes => ({
  type: GET_SCHEDULE_SUCCESS,
  payload,
});

export const createScheduleRequest = (payload: any): ScheduleActionTypes => ({
  type: CREATE_SCHEDULE_REQUEST,
  payload,
});

export const createScheduleSuccess = (payload: any): ScheduleActionTypes => ({
  type: CREATE_SCHEDULE_SUCCESS,
  payload,
});

export const deleteScheduleRequest = (payload: string): ScheduleActionTypes => ({
  type: DELETE_SCHEDULE_REQUEST,
  payload,
});

export const deleteScheduleSuccess = (payload: string): ScheduleActionTypes => ({
  type: DELETE_SCHEDULE_REQUEST,
  payload,
});

export const finishScheduleRequest = (payload: string): ScheduleActionTypes => ({
  type: FINISH_SCHEDULE_REQUEST,
  payload,
});

export const finishScheduleSuccess = (payload: string): ScheduleActionTypes => ({
  type: FINISH_SCHEDULE_SUCCESS,
  payload,
});

export const selectSchedule = (payload: any): ScheduleActionTypes => ({
  type: SELECT_SCHEDULE,
  payload,
});

export const clearSelectedSchedule = (): ScheduleActionTypes => ({
  type: CLEAR_SELECTED_SCHEDULE,
});
