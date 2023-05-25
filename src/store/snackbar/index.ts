import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { AlertType } from './snackbar.types';
import { hideSnackbar, showSnackbar } from './snackbar.actions';

export const useSnackbarActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      show: (type: AlertType, message: string) => {
        dispatch(showSnackbar({ type, message }));
      },
      hide: () => {
        dispatch(hideSnackbar());
      },
    }),
    [dispatch],
  );
};
