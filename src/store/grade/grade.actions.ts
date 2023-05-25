import {
  CHOOSE_GRADES,
  GET_GRADES_REQUEST,
  GET_GRADES_SUCCESS,
  GradesActionType,
  RESET_GRADES,
} from './grade.types';
import { Grade } from 'entities/Grade';

export const getGradesRequest = (): GradesActionType => ({
  type: GET_GRADES_REQUEST,
});

export const getGradesSuccess = (payload: Grade[]): GradesActionType => ({
  type: GET_GRADES_SUCCESS,
  payload,
});

export const resetGrades = (): GradesActionType => ({
  type: RESET_GRADES,
});

export const chooseGrades = (payload: Grade[]): GradesActionType => ({
  type: CHOOSE_GRADES,
  payload,
});
