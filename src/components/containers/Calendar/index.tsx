import { Lesson } from 'entities/Lesson';
import React from 'react';
import useStyles from 'components/containers/Calendar/Calendar.styles';
import { Box } from '@mui/material';
import WeekDayIndicator from 'components/containers/Calendar/WeekdayIndicator';
import moment from 'moment';
import DateIndicator from 'components/containers/Calendar/DateIndicator';
import CalendarHeader from 'components/containers/Calendar/CalendarHeader';

interface CalendarProps<T> {
  selectDate: Date;
  setSelectDate: (date: Date) => void;
  dataByMonth: T[];
}

type MonthData = Lesson | any;

const Calendar: React.FC<CalendarProps<MonthData>> = ({
  selectDate,
  setSelectDate,
  dataByMonth,
}) => {
  const { classes } = useStyles();

  const handleSetSelectDate = (value: Date) => {
    setSelectDate(value);
  };

  const handleSetNextMonth = () => {
    setSelectDate(moment(selectDate).add(1, 'M').toDate());
  };

  const handleSetPreviousMonth = () => {
    setSelectDate(moment(selectDate).add(-1, 'M').toDate());
  };

  return (
    <Box className={classes.root}>
      <CalendarHeader
        nextMonthAction={handleSetNextMonth}
        previousMonthAction={handleSetPreviousMonth}
        selectDate={selectDate}
      />
      <WeekDayIndicator />
      <DateIndicator
        selectDate={selectDate}
        changeDate={handleSetSelectDate}
        dataByMonth={dataByMonth}
      />
    </Box>
  );
};

export default Calendar;
