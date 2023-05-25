import React from 'react';
import useStyles from './FinishConfirmationModal.styles';
import { Dialog, DialogContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { withTranslation, WithTranslation } from 'react-i18next';
import Countdown from 'components/ui/Countdown';

interface FinishConfirmationModalProps {
  timerDuration: number;
  timerRemaining: number;
  submit: () => void;
  close: () => void;
  isOpen: boolean;
}

const FinishConfirmationModal: React.FC<FinishConfirmationModalProps & WithTranslation> = ({
  timerDuration,
  timerRemaining,
  submit,
  close,
  isOpen,
  t,
}) => {
  const { classes, cx } = useStyles();

  return (
    <Dialog
      PaperProps={{ className: classes.dialog }}
      BackdropProps={{
        className: classes.backdrop,
      }}
      open={isOpen}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.root}>
        <Grid container className={classes.container}>
          <Typography className={classes.timeSpent}>
            {t('Study.Confirmation.Time Spent', {
              minutes: Math.floor((timerDuration - timerRemaining) / 60),
            })}
          </Typography>
          <Grid item className={classes.countdown}>
            <Countdown
              duration={timerDuration}
              remaining={timerRemaining}
              onFinish={() => {
                return;
              }}
              shadow={true}
            />
          </Grid>
          <Typography className={classes.youSure}>
            {t('Study.Confirmation.Are you sure')}
          </Typography>
          <Box className={classes.buttonContainer}>
            <Button
              disableElevation
              color={'primary'}
              variant={'contained'}
              className={cx(classes.button, classes.purple)}
              onClick={close}
            >
              {t('Study.Confirmation.Continue Learning')}
            </Button>
            <Button
              disableElevation
              color={'primary'}
              variant={'contained'}
              className={cx(classes.button, classes.red)}
              onClick={submit}
            >
              {t('Study.Confirmation.Finish Learning')}
            </Button>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(FinishConfirmationModal);
