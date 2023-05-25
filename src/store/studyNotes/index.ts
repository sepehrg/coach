import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import {
  createStudyNoteRequest,
  getFavoriteStudyNotesRequest,
  getStudyNoteRequest,
  getStudyNoteOverviewRequest,
  updateStudyNoteRequest,
} from './studyNotes.actions';
import {
  CreateStudyNotePayload,
  UpdateStudyNotePayload,
  GetStudyNoteOverviewPayload,
  GetStudyNotePayload,
} from 'entities/StudyNote';

export const useStudyNotesActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      getStudyNote: (payload: GetStudyNotePayload) => {
        dispatch(getStudyNoteRequest(payload));
      },
      getStudyNoteOverview: (payload: GetStudyNoteOverviewPayload) => {
        dispatch(getStudyNoteOverviewRequest(payload));
      },
      getFavoriteStudyNotes: () => {
        dispatch(getFavoriteStudyNotesRequest());
      },
      createStudyNote: (payload: CreateStudyNotePayload) => {
        dispatch(createStudyNoteRequest(payload));
      },
      updateStudyNote: (payload: UpdateStudyNotePayload) => {
        dispatch(updateStudyNoteRequest(payload));
      },
    }),
    [dispatch],
  );
};
