export const SHOW_SNACKBAR = 'SNACKBAR_SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'SNACKBAR_HIDE_SNACKBAR';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | '';

export interface SnackbarState {
  isOpen: boolean;
  type: AlertType;
  message: string;
}

export interface ShowSnackbar {
  type: typeof SHOW_SNACKBAR;
  payload: {
    type: AlertType;
    message: string;
  };
}

export interface HideSnackbar {
  type: typeof HIDE_SNACKBAR;
}

export type SnackbarActionsType = ShowSnackbar | HideSnackbar;
