import { IconButton } from '@mui/material';
import React from 'react';
import useRouterActions from 'store/router';
import * as Assets from './assets';
import useStyles from './GoBackArrow.styles';

const GoBackArrow: React.FC = () => {
  const { classes } = useStyles();
  const { goBack } = useRouterActions();
  return (
    <IconButton onClick={goBack} className={classes.root} size="large">
      <img src={Assets.BackArrow} alt="Arrow to back" className={classes.img} />
    </IconButton>
  );
};

export default GoBackArrow;
