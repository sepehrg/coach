import React from 'react';
import { Box } from '@mui/material';
import useStyles from 'components/containers/Calendar/WeekdayIndicator/WeekdayIndicator.styles';
import Typography from '@mui/material/Typography';
import i18next from 'i18next';

const WEEKDAYS_EN = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const WEEKDAYS_DE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

const WeekDayIndicator: React.FC = () => {
  const { classes } = useStyles();
  const WEEKDAYS = i18next.language === 'de' ? WEEKDAYS_DE : WEEKDAYS_EN;

  const weekdayIcons = WEEKDAYS.map((day: string) => {
    return (
      <Box key={day} className={classes.dayBox}>
        <Typography variant={'body1'}>{day}</Typography>
      </Box>
    );
  });

  return <Box className={classes.root}>{weekdayIcons}</Box>;
};

export default WeekDayIndicator;
