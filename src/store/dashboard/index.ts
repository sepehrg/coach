import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { getClassmatesRequest, getStudyProgressRequest } from './dashboard.actions';
import { StudyProgressPayload } from 'entities/Student';

export const useDashboardActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      dispatchGetClassmates: () => {
        dispatch(getClassmatesRequest());
      },
      dispatchGetStudyProgress: (payload: StudyProgressPayload) => {
        dispatch(getStudyProgressRequest(payload));
      },
    }),
    [dispatch],
  );
};
