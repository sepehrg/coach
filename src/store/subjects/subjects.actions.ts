import { Subject } from 'entities/Subject';
import {
  CLEAR_SELECTED_SUBJECT,
  GET_SUBJECTS_REQUEST,
  GET_SUBJECTS_SUCCESS,
  SELECT_SUBJECT,
  SubjectActionTypes,
  GET_SUBJECT_BY_ID_REQUEST,
  GET_SUBJECT_BY_ID_SUCCESS,
  CREATE_SUGGESTED_SUBJECT_REQUEST,
  UPDATE_MY_SUBJECTS_REQUEST,
} from './subjects.types';

export const getSubjectsRequest = (): SubjectActionTypes => ({
  type: GET_SUBJECTS_REQUEST,
});

export const getSubjectsSuccess = (payload: Subject[]): SubjectActionTypes => ({
  type: GET_SUBJECTS_SUCCESS,
  payload,
});

export const getSubjectByIdRequest = (payload: string): SubjectActionTypes => ({
  type: GET_SUBJECT_BY_ID_REQUEST,
  payload,
});

export const getSubjectByIdSuccess = (payload: Subject): SubjectActionTypes => ({
  type: GET_SUBJECT_BY_ID_SUCCESS,
  payload,
});

export const selectSubject = (payload: Subject): SubjectActionTypes => ({
  type: SELECT_SUBJECT,
  payload,
});

export const clearSelectedSubject = (): SubjectActionTypes => ({
  type: CLEAR_SELECTED_SUBJECT,
});

export const createSuggestedSubjectRequest = (payload: {
  data: FormData;
  onSuccess: () => void;
}): SubjectActionTypes => ({
  type: CREATE_SUGGESTED_SUBJECT_REQUEST,
  payload,
});

export const updateMySubjectsRequest = (payload: {
  subjects: { id: string }[];
  onSuccess: () => void;
}): SubjectActionTypes => ({
  type: UPDATE_MY_SUBJECTS_REQUEST,
  payload,
});
