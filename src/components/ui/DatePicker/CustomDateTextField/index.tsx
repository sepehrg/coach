import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useStyles from './CustomDateTextField.styles';
import { DateView } from '../index';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface CustomDateTextFieldProps {
  value: Date;
  togglePicking: (type?: DateView) => void;
}

const CustomDateTextField: React.FC<CustomDateTextFieldProps> = ({ value, togglePicking }) => {
  const { classes } = useStyles();
  return (
    <Grid container justifyContent={'space-between'}>
      <Grid item xs={3} md={3} xl={3}>
        <Box className={classes.dateItemBox} onClick={() => togglePicking('date')}>
          <Typography variant={'body1'}>{value.getDate()}</Typography>
        </Box>
      </Grid>
      <Grid item xs={5} md={5} xl={5}>
        <Box
          className={`${classes.dateItemBox} ${classes.monthBox}`}
          onClick={() => togglePicking('month')}
        >
          <Typography variant={'body1'}>{MONTH_NAMES[value.getMonth()]}</Typography>
        </Box>
      </Grid>
      <Grid item xs={3} md={3} xl={3}>
        <Box className={classes.dateItemBox} onClick={() => togglePicking('year')}>
          <Typography variant={'body1'}>{value.getFullYear()}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomDateTextField;
