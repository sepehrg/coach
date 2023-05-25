import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { chooseGrades, getGradesRequest, resetGrades } from './grade.actions';
import { Grade } from 'entities/Grade';

export const useGradeActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      get: () => {
        dispatch(getGradesRequest());
      },
      chooseGrades: (grades: Grade[]) => {
        dispatch(chooseGrades(grades));
      },
      reset: () => {
        dispatch(resetGrades());
      },
    }),
    [dispatch],
  );
};
