import React from 'react';
import * as Assets from './assets';
import useStyles from './RememberMe.styles';
import { Typography } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';

interface RememberMeProps {
  checked: boolean;
  setChecked: (value: boolean) => void;
}

const RememberMe: React.FC<RememberMeProps & WithTranslation> = ({ checked, setChecked, t }) => {
  const { classes } = useStyles();

  return (
    <span className={classes.root} onClick={() => setChecked(!checked)}>
      <img
        src={checked ? Assets.Checked : Assets.Unchecked}
        alt="Checker"
        className={classes.icon}
      />
      <Typography variant={'body1'}>{t('Login.Remember me')}</Typography>
    </span>
  );
};

export default withTranslation()(RememberMe);
