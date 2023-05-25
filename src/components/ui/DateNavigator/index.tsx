import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { rangeLessonsSelector } from 'store/lessons/lessons.selectors';
import useStyles from './DateNavigator.styles';
import moment, { Moment } from 'moment';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as Assets from './assets';
import IconButton from 'components/ui/IconButton';

const WEEK_DAYS = [0, 1, 2, 3, 4, 5, 6].map((day) =>
  moment().locale('de').weekday(day).format('dd'),
);

interface DateNavigatorProps {
  selectDate: Moment;
  changeDate: (date: Moment) => void;
  getByRange: (date: Moment) => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({ selectDate, changeDate, getByRange }) => {
  const { classes } = useStyles();
  const lessonsByRange = useSelector(rangeLessonsSelector);
  const [firstDateOfCurrentWeek, setFirstDateOfCurrentWeek] = useState<Moment>(moment());

  useEffect(() => {
    getByRange(firstDateOfCurrentWeek);
  }, [firstDateOfCurrentWeek, getByRange]);

  const renderRange = (day: Moment) => {
    const range: Moment[] = [];
    let count = 0;
    while (count < 7) {
      if (!range.length) {
        range.push(moment(day));
      } else {
        range.push(moment(range[range.length - 1]).add(1, 'd'));
      }
      count++;
    }
    return range.map((day) => {
      const isActive = day.isSame(selectDate, 'day');
      return (
        <Grid item key={day.toString()}>
          <Box
            className={`${classes.dayBox} ${isActive ? classes.dayBoxActive : ''}`}
            onClick={() => changeDate(day)}
          >
            <Typography
              variant={'body1'}
              className={`${classes.weekDayName} ${isActive ? classes.weekDayNameActive : ''}`}
            >
              {WEEK_DAYS[day.weekday()]}
            </Typography>
            <Typography variant={'h1'} className={classes.weekDayDate}>
              {day.date()}
            </Typography>
            {lessonsByRange.filter((item) => moment(day).isSame(item.startedAt, 'day')).length >
            0 ? (
              <Box className={classes.dotConsist} />
            ) : null}
          </Box>
        </Grid>
      );
    });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.daysContainer}>{renderRange(firstDateOfCurrentWeek)}</Box>
      <Box className={classes.buttonsContainer}>
        <IconButton
          action={() => setFirstDateOfCurrentWeek((prev) => moment(prev).add(-1, 'd'))}
          outerClass={classes.arrowBox}
          size="large"
        >
          <img src={Assets.ArrowLeft} alt="Arrow left" className={classes.arrowImg} />
        </IconButton>
        <IconButton
          action={() => setFirstDateOfCurrentWeek((prev) => moment(prev).add(1, 'd'))}
          outerClass={classes.arrowBox}
          size="large"
        >
          <img src={Assets.ArrowRight} alt="Arrow right" className={classes.arrowImg} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DateNavigator;
