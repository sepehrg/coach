import { useDispatch } from 'react-redux';
import {
  clearSelectedSubject,
  getSubjectsRequest,
  selectSubject,
  getSubjectByIdRequest,
  createSuggestedSubjectRequest,
  updateMySubjectsRequest,
} from './subjects.actions';
import { Subject } from 'entities/Subject';
import { useMemo } from 'react';

export const useSubjectsActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      get: () => {
        dispatch(getSubjectsRequest());
      },
      getById: (subjectId: string) => {
        dispatch(getSubjectByIdRequest(subjectId));
      },
      selectItem: (subject: Subject) => {
        dispatch(selectSubject(subject));
      },
      clearSelectedItem: () => {
        dispatch(clearSelectedSubject());
      },
      createSuggested: (data: FormData, onSuccess: () => void) => {
        dispatch(
          createSuggestedSubjectRequest({
            data,
            onSuccess,
          }),
        );
      },
      updateMySubjects: (subjects: { id: string }[], onSuccess: () => void) => {
        dispatch(updateMySubjectsRequest({ subjects, onSuccess }));
      },
    }),
    [dispatch],
  );
};
