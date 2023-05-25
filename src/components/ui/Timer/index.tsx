import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

interface TimerProps {
  duration: number;
  initialTime: number;
  actionOnEnd: () => void;
  remainingTime: number;
  canFinish: boolean;
  isEnd?: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, actionOnEnd, remainingTime, isEnd }) => {
  return (
    <CountdownCircleTimer
      onComplete={actionOnEnd}
      isPlaying={true}
      duration={duration * 60}
      initialRemainingTime={remainingTime}
      colors="#0091FF"
    >
      {({ remainingTime }) => {
        if (isEnd) {
          return <Typography variant={'body1'}>00:00</Typography>;
        }
        if (remainingTime) {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          return (
            <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <Typography variant={'body1'}>{`${minutes >= 10 ? minutes : '0' + minutes}:${
                  seconds >= 10 ? seconds : '0' + seconds
                }`}</Typography>
              </Grid>
            </Grid>
          );
        }
      }}
    </CountdownCircleTimer>
  );
};

export default Timer;
