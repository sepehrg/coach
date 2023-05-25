import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateLessonSummaryRequest } from 'entities/LessonSummary';
import { createSummaryRequest } from './summary.actions';
import { useMemo } from 'react';

const useSummaryActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMemo(
    () => ({
      createSummary: (summary: CreateLessonSummaryRequest) => {
        dispatch(createSummaryRequest(summary, navigate));
      },
    }),
    [dispatch, navigate],
  );
};

export default useSummaryActions;
