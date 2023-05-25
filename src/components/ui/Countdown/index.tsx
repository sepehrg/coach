import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';
import useStyles from './Countdown.styles';
import { Clock } from 'assets/images/icons';
import { useStudycardsActions } from 'store/studycards';
import moment from 'moment';

interface CountdownProps {
  duration: number; // total duration should be in seconds
  remaining: number;
  onFinish: () => void;
  shadow?: boolean;
}

export interface StyleProps {
  duration: number;
  remaining: number;
}

const Countdown: React.FC<CountdownProps> = ({ duration, remaining, onFinish, shadow }) => {
  const { updateTimer } = useStudycardsActions();
  const [endTime, setEndTime] = useState<Date>();
  const remainingRef = useRef(remaining);
  const { classes, cx } = useStyles({ duration, remaining: remainingRef.current });

  useEffect(() => {
    setEndTime(moment().add(duration, 'seconds').toDate());
  }, [duration]);

  useEffect(() => {
    let interval: number;
    if (remaining !== -1) {
      remainingRef.current = Math.max(0, remaining);

      if (moment(endTime).add(remainingRef.current).toDate() < moment().toDate())
        setEndTime(moment().add(duration, 'seconds').toDate());

      if (remainingRef.current > 0)
        interval = setInterval(() => {
          updateTimer(moment(endTime).diff(moment(), 'seconds'));
        }, 1000);
      if (remainingRef.current === 0) onFinish();
    }
    return () => clearInterval(interval);
  }, [endTime, onFinish, updateTimer, remaining, duration]);

  const timesRemaining = () => {
    const minutes = Math.floor(remainingRef.current / 60);
    const seconds = remainingRef.current % 60;
    return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
  };

  return (
    <Grid container className={classes.cylinderContainer}>
      <Grid item className={classes.left}></Grid>
      <Grid item className={cx(classes.cylinder, shadow && classes.shadow)}>
        <Box className={classes.liquid}></Box>
        <Box className={cx(classes.time, 'time')}>
          <img src={Clock} alt="time" /> {timesRemaining()}
        </Box>
      </Grid>
      <Grid item className={classes.right}></Grid>
    </Grid>
  );
};

export default Countdown;
