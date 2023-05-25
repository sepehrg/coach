import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { clearSearch, searchGroupmatesRequest, searchSubjectsTopics } from './search.actions';

export const useSearchActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      searchSubjectsAndTopic: (query: string) => {
        dispatch(searchSubjectsTopics(query));
      },
      searchGroupmates: (query: string) => {
        dispatch(searchGroupmatesRequest(query));
      },
      clear: () => {
        dispatch(clearSearch());
      },
    }),
    [dispatch],
  );
};
