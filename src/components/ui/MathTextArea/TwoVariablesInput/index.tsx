import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import useStyles from './TwoVariablesInput.styles';
import { WithTranslation, withTranslation } from 'react-i18next';

interface TwoVariablesInputProps {
  isOpen: boolean;
  onSubmit: (a: string, b: string) => void;
}

const TwoVariablesInput: React.FC<TwoVariablesInputProps & WithTranslation> = (props) => {
  const { isOpen, onSubmit, t } = props;
  const { classes } = useStyles();
  const [varA, setVarA] = useState<string>('');
  const [varB, setVarB] = useState<string>('');
  return (
    <Grid className={isOpen ? classes.container : classes.hidden}>
      <Grid
        container
        direction={'row'}
        wrap={'nowrap'}
        justifyContent={'space-between'}
        alignItems={'center'}
        className={classes.innerWrapper}
      >
        <Grid container direction={'row'} wrap={'nowrap'}>
          <Typography variant={'body1'}>x= </Typography>
          <input
            value={varA}
            className={classes.input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setVarA(event.target.value)}
          />
        </Grid>
        <Grid container direction={'row'} wrap={'nowrap'}>
          <Typography variant={'body1'}>n= </Typography>
          <input
            value={varB}
            className={classes.input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setVarB(event.target.value)}
          />
        </Grid>
        <Button className={classes.button} onClick={() => onSubmit(varA, varB)} color="primary">
          {t('Study Cards.Common.Add')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(TwoVariablesInput);
