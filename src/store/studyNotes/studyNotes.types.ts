import {
  CreateStudyNotePayload,
  GetStudyNoteOverviewPayload,
  StudyNote,
  UpdateStudyNotePayload,
} from 'entities/StudyNote';

export const GET_STUDY_NOTE_REQUEST = 'GET_STUDY_NOTE_REQUEST';
export const GET_STUDY_NOTE_SUCCESS = 'GET_STUDY_NOTE_SUCCESS';
export const GET_STUDY_NOTE_OVERVIEW_REQUEST = 'GET_STUDY_NOTE_OVERVIEW_REQUEST';
export const GET_STUDY_NOTE_OVERVIEW_SUCCESS = 'GET_STUDY_NOTE_OVERVIEW_SUCCESS';
export const GET_FAVORITE_STUDY_NOTES_REQUEST = 'GET_FAVORITE_STUDY_NOTES_REQUEST';
export const GET_FAVORITE_STUDY_NOTES_SUCCESS = 'GET_FAVORITE_STUDY_NOTES_SUCCESS';
export const CREATE_STUDY_NOTE_REQUEST = 'CREATE_STUDY_NOTE_REQUEST';
export const UPDATE_STUDY_NOTE_REQUEST = 'UPDATE_STUDY_NOTE_REQUEST';

export interface StudyNotesState {
  studyNote: StudyNote[];
  overviewStudyNotes: StudyNote[];
  favoriteStudyNotes: StudyNote[];
}

export interface GetStudyNoteRequest {
  type: typeof GET_STUDY_NOTE_REQUEST;
  payload: {
    date: string;
    subjectId: string;
    onSuccess: (studyNote: StudyNote[]) => void;
  };
}

export interface GetStudyNoteSuccess {
  type: typeof GET_STUDY_NOTE_SUCCESS;
  payload: StudyNote[];
}

export interface GetStudyNoteOverviewRequest {
  type: typeof GET_STUDY_NOTE_OVERVIEW_REQUEST;
  payload: GetStudyNoteOverviewPayload;
}

export interface GetStudyNoteOverviewSuccess {
  type: typeof GET_STUDY_NOTE_OVERVIEW_SUCCESS;
  payload: StudyNote[];
}

export interface GetFavoriteStudyNotesRequest {
  type: typeof GET_FAVORITE_STUDY_NOTES_REQUEST;
}

export interface GetFavoriteStudyNotesSuccess {
  type: typeof GET_FAVORITE_STUDY_NOTES_SUCCESS;
  payload: StudyNote[];
}

export interface CreateStudyNoteRequest {
  type: typeof CREATE_STUDY_NOTE_REQUEST;
  payload: CreateStudyNotePayload;
}

export interface UpdateStudyNoteRequest {
  type: typeof UPDATE_STUDY_NOTE_REQUEST;
  payload: UpdateStudyNotePayload;
}

export type StudyNotesActionTypes =
  | GetStudyNoteRequest
  | GetStudyNoteSuccess
  | GetStudyNoteOverviewRequest
  | GetStudyNoteOverviewSuccess
  | GetFavoriteStudyNotesRequest
  | GetFavoriteStudyNotesSuccess
  | CreateStudyNoteRequest
  | UpdateStudyNoteRequest;
