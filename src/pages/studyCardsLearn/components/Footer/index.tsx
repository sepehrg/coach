import React from 'react';
import { Button, Grid } from '@mui/material';
import useStyles from './Footer.styles';
import { WithTranslation, withTranslation } from 'react-i18next';

interface FooterProps {
  onStartSession: () => void;
}

const Footer: React.FC<FooterProps & WithTranslation> = (props) => {
  const { classes } = useStyles();
  const { onStartSession, t } = props;

  return (
    <Grid className={classes.container} container justifyContent="center" alignItems="center">
      <Button
        variant={'contained'}
        color={'primary'}
        className={classes.start}
        disableElevation
        onClick={onStartSession}
      >
        {t('Study Cards.Learn.Start session')}
      </Button>
    </Grid>
  );
};

export default withTranslation()(Footer);
