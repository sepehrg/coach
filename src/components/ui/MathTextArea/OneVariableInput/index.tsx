import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import useStyles from './OneVariableInput.styles';
import { withTranslation, WithTranslation } from 'react-i18next';

interface OneVariableInputProps {
  isOpen: boolean;
  onSubmit: (a: string) => void;
  variableName: string;
}

const OneVariableInput: React.FC<OneVariableInputProps & WithTranslation> = (props) => {
  const { isOpen, onSubmit, variableName, t } = props;
  const { classes } = useStyles();
  const [varA, setVarA] = useState<string>('');
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
          <Typography variant={'body1'}>{variableName} = </Typography>
          <input
            value={varA}
            className={classes.input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setVarA(event.target.value)}
          />
        </Grid>
        <Button className={classes.button} onClick={() => onSubmit(varA)} color="primary">
          {t('Study Cards.Common.Add')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(OneVariableInput);
