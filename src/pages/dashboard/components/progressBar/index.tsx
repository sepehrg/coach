import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import useStyles from './progressBar.styles';

interface ProgressBarpProps {
  percent: number;
  className?: string;
}

const ProgressBar: FC<ProgressBarpProps> = ({ percent, className }) => {
  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.container, className)}>
      <Box className={classes.barLeft}>
        <Typography className={classes.percent}>{percent}%</Typography>
        <Box className={classes.bar} style={{ width: `${percent}%` }}></Box>
      </Box>
    </Box>
  );
};

export default ProgressBar;
