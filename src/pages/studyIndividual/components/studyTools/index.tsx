import { Button, Grid } from '@mui/material';
import React from 'react';
import useStyles from './StudyTools.styles';
import Countdown from 'components/ui/Countdown';
import { Link, Stop } from 'assets/images/icons';

interface StudyToolsProps {
  onOpenLinkModal?: () => void;
  onStopStudy: () => void;
  timerDuration: number;
  timerRemaining: number;
  onFinishTimer: () => void;
}

const StudyTools: React.FC<StudyToolsProps> = ({
  onOpenLinkModal,
  onStopStudy,
  timerDuration,
  timerRemaining,
  onFinishTimer,
}) => {
  const { classes } = useStyles();

  return (
    <Grid container className={classes.controls} spacing={3}>
      {onOpenLinkModal && (
        <Grid item>
          <Button className={classes.button} onClick={onOpenLinkModal}>
            <img src={Link} alt="link" />
          </Button>
        </Grid>
      )}
      <Grid item>
        <Button className={classes.button} onClick={onStopStudy}>
          <img src={Stop} alt="stop" />
        </Button>
      </Grid>
      <Grid item container className={classes.timer}>
        <Countdown duration={timerDuration} remaining={timerRemaining} onFinish={onFinishTimer} />
      </Grid>
    </Grid>
  );
};

export default StudyTools;
