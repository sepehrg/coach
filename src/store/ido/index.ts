import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { getGreeting, getIdoActionRequest, removeAllMessages, removeGreeting } from './ido.actions';
import { IdoActionRequest } from 'entities/Ido';

export const useIdoActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      getGreeting: () => {
        dispatch(getGreeting());
      },
      getIdoAction: (payload: IdoActionRequest) => {
        dispatch(getIdoActionRequest(payload));
      },
      removeGreeting: () => {
        dispatch(removeGreeting());
      },
      removeAllMessages: () => {
        dispatch(removeAllMessages());
      },
    }),
    [dispatch],
  );
};
