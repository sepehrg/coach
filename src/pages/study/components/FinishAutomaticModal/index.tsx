import { Dialog, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import useStyles from './FinishAutomaticModal.styles';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Break, Flag, Refresh } from 'assets/images/icons';
import { useLocation } from 'react-router-dom';
import { useLessonActions } from 'store/lessons';
import { Mixpanel } from 'utils/mixpanel';

interface FinishAutomaticModalProps {
  isOpen: boolean;
  isReopened: boolean;
  count: number;
  takeBreak: () => void;
  finishStudy: () => void;
  continueStudy: () => void;
}

const FinishAutomaticModal: React.FC<FinishAutomaticModalProps & WithTranslation> = (props) => {
  const { isOpen, isReopened, count, takeBreak, finishStudy, continueStudy, t } = props;
  const { classes } = useStyles();
  const { state: stateFromHistory } = useLocation();
  const { finishLesson } = useLessonActions();

  const onTakeBreakClick = () => {
    Mixpanel.track('Take a break');
    takeBreak();
  };

  const continueBtnProps = {
    disableElevation: true,
    className: classes.button,
    startIcon: <img src={Refresh} className={classes.refreshIcon} alt="refresh icon" />,
    onClick: continueStudy,
  };

  const breakBtnProps = {
    disableElevation: true,
    className: classes.button,
    onClick: onTakeBreakClick,
    startIcon: <img src={Break} className={classes.breakIcon} alt="cup of tea" />,
  };

  const finishBtnProps = {
    disableElevation: true,
    className: classes.button,
    onClick: finishStudy,
    startIcon: <img src={Flag} className={classes.flagIcon} alt="flag icon" />,
  };

  useEffect(() => {
    isOpen &&
      !isReopened &&
      finishLesson(stateFromHistory.lessonId, () => {
        return;
      });
  }, [finishLesson, isOpen, isReopened, stateFromHistory.lessonId]);

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.root}>
        <Box className={`${classes.fullWidth} ${classes.coloredBox}`}>
          <Typography variant={'h2'}>{t("Study.Finish Automatic Modal.Time's up")}</Typography>
        </Box>
        <Box className={classes.countBox}>
          <Typography>{t("Study.Finish Automatic Modal.Today's study time")}</Typography>
          <Typography variant={'body1'} className={classes.countNumberText}>
            {count}
          </Typography>
          <Typography>{t('Study.Finish Automatic Modal.minutes')}</Typography>
        </Box>
        <Box className={classes.actionsBox}>
          <Box className={`${classes.fullWidth} ${classes.coloredBox}`}>
            <Typography variant={'h2'}>
              {t('Study.Finish Automatic Modal.What do you want to do?')}
            </Typography>
          </Box>
          <Box className={`${classes.fullWidth} ${classes.buttonsBox}`}>
            <Button variant={'contained'} color={'primary'} {...continueBtnProps}>
              {t('Study.Finish Automatic Modal.Continue studying')}
            </Button>
            <Button variant={'contained'} color={'primary'} {...breakBtnProps}>
              {t('Study.Finish Automatic Modal.Take a break')}
            </Button>
            <Button variant={'contained'} color={'primary'} {...finishBtnProps}>
              {t('Study.Finish Automatic Modal.Done')}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default withTranslation()(FinishAutomaticModal);
