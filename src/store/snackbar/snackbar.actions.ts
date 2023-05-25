import { AlertType, HIDE_SNACKBAR, SHOW_SNACKBAR, SnackbarActionsType } from './snackbar.types';

export const showSnackbar = (payload: {
  type: AlertType;
  message: string;
}): SnackbarActionsType => ({
  type: SHOW_SNACKBAR,
  payload,
});

export const hideSnackbar = (): SnackbarActionsType => ({
  type: HIDE_SNACKBAR,
});
