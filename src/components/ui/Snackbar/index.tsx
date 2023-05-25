import { delay } from 'lodash-es';
import React, { useCallback, useEffect, useState } from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { snackbarSelector } from 'store/snackbar/snackbar.selectors';
import { useSnackbarActions } from 'store/snackbar';

const Snackbar: React.FC = () => {
  const { isOpen, type, message } = useSelector(snackbarSelector);
  const { hide } = useSnackbarActions();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!open) {
      delay(() => hide(), 500);
    }
  }, [open, hide]);

  const handleCloseSnackbar = useCallback(() => setOpen(false), []);

  return (
    <MuiSnackbar open={open} autoHideDuration={5000} onClose={handleCloseSnackbar}>
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleCloseSnackbar}
        severity={type as AlertColor}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
