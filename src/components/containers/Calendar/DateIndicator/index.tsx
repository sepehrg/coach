import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Loader from 'components/containers/Loader';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { GET_LESSONS_BY_MONTH_REQUEST } from 'store/lessons/lessons.types';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import {
  getDatesInMonthDisplay,
  getDayOfMonth,
  getFirstWeekdayOfMonth,
  getMonth,
  getYear,
} from 'utils/calendar';
import useStyles from 'components/containers/Calendar/DateIndicator/DateIndecator.styles';

interface DateIndicatorProps {
  selectDate: Date;
  changeDate: (value: Date) => void;
  dataByMonth: any[];
}

const DateIndicator: React.FC<DateIndicatorProps> = ({ selectDate, changeDate, dataByMonth }) => {
  const { classes } = useStyles();
  const datesInMonth = getDatesInMonthDisplay(getMonth(selectDate) + 1, getYear(selectDate));
  const firstMonthDay = getFirstWeekdayOfMonth(getMonth(selectDate), getYear(selectDate));
  const loading = useSelector(loadingActionSelector)([GET_LESSONS_BY_MONTH_REQUEST]);

  const monthDates = datesInMonth.map((date, key) => (
    <Box
      className={`${classes.dateBox} ${
        moment(date).isSame(selectDate, 'day') ? classes.dateBoxActive : ''
      }`}
      key={`day-${key}`}
      onClick={() => changeDate(date)}
    >
      <Typography
        className={`${moment(date).isSame(selectDate, 'day') ? classes.dateTextActive : ''}`}
        variant={'h4'}
      >
        {getDayOfMonth(date)}
      </Typography>
      {dataByMonth.filter((item) => moment(date).isSame(item.startedAt, 'day')).length > 0 ? (
        <Box className={classes.dotConsist} />
      ) : null}
    </Box>
  ));

  const calendarBody = () => {
    const empty = [];
    const emptyBox = (key: string) => (
      <Box
        className={`${classes.dateBox} ${classes.emptyDateBox}`}
        onClick={() => {
          return;
        }}
        key={key}
      />
    );
    for (let i = 1; i < firstMonthDay; i++) {
      empty.push(emptyBox(`empty-${i}`));
    }
    const result = [...empty, ...monthDates];
    for (let i = 42 - result.length; i >= 1; i--) {
      result.push(emptyBox(`empty-${42 - i}`));
    }
    return result;
  };

  return (
    <Loader loading={loading}>
      <Box className={classes.root}>{calendarBody()}</Box>
    </Loader>
  );
};

export default DateIndicator;
