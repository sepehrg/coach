import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Button, Grid } from '@mui/material';
import useStyles from './BackButton.styles';
import { ArrowLeft } from 'assets/images/icons';

interface BackButtonProps {
  onDeactiveCreateCard: () => void;
}

const BackButton: React.FC<WithTranslation & BackButtonProps> = ({ t, onDeactiveCreateCard }) => {
  const { classes } = useStyles();

  return (
    <Grid item className={classes.root}>
      <Button
        variant={'contained'}
        color={'primary'}
        disableElevation
        startIcon={<img src={ArrowLeft} alt={'arrow left'} />}
        onClick={onDeactiveCreateCard}
      >
        {t('Study Cards.Learn.Back')}
      </Button>
    </Grid>
  );
};

export default withTranslation()(BackButton);
