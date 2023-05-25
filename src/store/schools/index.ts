import { useDispatch } from 'react-redux';
import { getSchoolsRequest } from './schools.actions';
import { useMemo } from 'react';

export const useSchoolActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      get: () => {
        dispatch(getSchoolsRequest());
      },
    }),
    [dispatch],
  );
};
