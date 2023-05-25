import { Grade } from 'entities/Grade';

export const GET_GRADES_REQUEST = 'GET_GRADES_REQUEST';
export const GET_GRADES_SUCCESS = 'GET_GRADES_SUCCESS';
export const RESET_GRADES = 'GRADES_RESET_GRADES';
export const CHOOSE_GRADES = 'CHOOSE_GRADES';

export interface GetGradesRequest {
  type: typeof GET_GRADES_REQUEST;
}

export interface GetGradesSuccess {
  type: typeof GET_GRADES_SUCCESS;
  payload: Grade[];
}

export interface ResetGradesAction {
  type: typeof RESET_GRADES;
}

export interface ChooseGradesAction {
  type: typeof CHOOSE_GRADES;
  payload: Grade[];
}

export interface GradesState {
  data: Grade[];
  chosenGrades: Grade[] | undefined;
}

export type GradesActionType =
  | GetGradesRequest
  | GetGradesSuccess
  | ResetGradesAction
  | ChooseGradesAction;
