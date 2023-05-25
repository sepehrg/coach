import { Subject } from 'entities/Subject';

export const GET_SUBJECTS_REQUEST = 'GET_SUBJECTS_REQUEST';
export const GET_SUBJECTS_SUCCESS = 'GET_SUBJECTS_SUCCESS';
export const GET_SUBJECT_BY_ID_REQUEST = 'GET_SUBJECT_BY_ID_REQUEST';
export const GET_SUBJECT_BY_ID_SUCCESS = 'GET_SUBJECT_BY_ID_SUCCESS';
export const CREATE_SUGGESTED_SUBJECT_REQUEST = 'CREATE_SUGGESTED_SUBJECT_REQUEST';
export const SELECT_SUBJECT = 'SELECT_SUBJECT';
export const CLEAR_SELECTED_SUBJECT = 'CLEAR_SELECTED_SUBJECT';
export const UPDATE_MY_SUBJECTS_REQUEST = 'UPDATE_MY_SUBJECTS_REQUEST';

export interface GetSubjectsRequest {
  type: typeof GET_SUBJECTS_REQUEST;
}

export interface GetSubjectsSuccess {
  type: typeof GET_SUBJECTS_SUCCESS;
  payload: Subject[];
}

export interface GetSubjectByIdRequest {
  type: typeof GET_SUBJECT_BY_ID_REQUEST;
  payload: string;
}

export interface GetSubjectByIdSuccess {
  type: typeof GET_SUBJECT_BY_ID_SUCCESS;
  payload: Subject;
}

export interface SelectSubject {
  type: typeof SELECT_SUBJECT;
  payload: Subject;
}

export interface ClearSelectedSubject {
  type: typeof CLEAR_SELECTED_SUBJECT;
}

export interface CreateSuggestedSubjectRequest {
  type: typeof CREATE_SUGGESTED_SUBJECT_REQUEST;
  payload: { data: FormData; onSuccess: () => void };
}

export interface SubjectsState {
  data: Subject[];
  selectedItem: Subject | null;
}

export interface UpdateMySubjectsRequest {
  type: typeof UPDATE_MY_SUBJECTS_REQUEST;
  payload: { subjects: { id: string }[]; onSuccess: () => void };
}

export type SubjectActionTypes =
  | GetSubjectsRequest
  | GetSubjectsSuccess
  | SelectSubject
  | ClearSelectedSubject
  | GetSubjectByIdRequest
  | GetSubjectByIdSuccess
  | CreateSuggestedSubjectRequest
  | UpdateMySubjectsRequest;
