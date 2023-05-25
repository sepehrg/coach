import {
  CreateStudyNotePayload,
  GetStudyNoteOverviewPayload,
  GetStudyNotePayload,
  StudyNote,
  UpdateStudyNotePayload,
} from 'entities/StudyNote';
import {
  CREATE_STUDY_NOTE_REQUEST,
  GET_FAVORITE_STUDY_NOTES_REQUEST,
  GET_FAVORITE_STUDY_NOTES_SUCCESS,
  GET_STUDY_NOTE_REQUEST,
  GET_STUDY_NOTE_SUCCESS,
  StudyNotesActionTypes,
  UPDATE_STUDY_NOTE_REQUEST,
  GET_STUDY_NOTE_OVERVIEW_REQUEST,
  GET_STUDY_NOTE_OVERVIEW_SUCCESS,
} from './studyNotes.types';

export const getStudyNoteRequest = (payload: GetStudyNotePayload): StudyNotesActionTypes => ({
  type: GET_STUDY_NOTE_REQUEST,
  payload,
});

export const getStudyNoteSuccess = (payload: StudyNote[]): StudyNotesActionTypes => ({
  type: GET_STUDY_NOTE_SUCCESS,
  payload,
});

export const getStudyNoteOverviewRequest = (
  payload: GetStudyNoteOverviewPayload,
): StudyNotesActionTypes => ({
  type: GET_STUDY_NOTE_OVERVIEW_REQUEST,
  payload,
});

export const getStudyNoteOverviewSuccess = (payload: StudyNote[]): StudyNotesActionTypes => ({
  type: GET_STUDY_NOTE_OVERVIEW_SUCCESS,
  payload,
});

export const getFavoriteStudyNotesRequest = (): StudyNotesActionTypes => ({
  type: GET_FAVORITE_STUDY_NOTES_REQUEST,
});

export const getFavoriteStudyNotesSuccess = (payload: StudyNote[]): StudyNotesActionTypes => ({
  type: GET_FAVORITE_STUDY_NOTES_SUCCESS,
  payload,
});

export const createStudyNoteRequest = (payload: CreateStudyNotePayload): StudyNotesActionTypes => ({
  type: CREATE_STUDY_NOTE_REQUEST,
  payload,
});

export const updateStudyNoteRequest = (payload: UpdateStudyNotePayload): StudyNotesActionTypes => ({
  type: UPDATE_STUDY_NOTE_REQUEST,
  payload,
});
