import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateFnsUtils from '@date-io/date-fns';
import CustomDateTextField from './CustomDateTextField';

interface DatePickerProps {
  handler: (value: any) => void;
  value: Date;
  minDate?: Date;
  maxDate?: Date;
}
export type DateView = 'date' | 'month' | 'year';

const EduDatePicker: React.FC<DatePickerProps> = ({ handler, value, minDate, maxDate }) => {
  const [isPicking, setIsPicking] = useState<boolean>(false);
  const [type, setType] = useState<DateView>('date');

  const handleTogglePicking = (pickingNowType?: DateView) => {
    setIsPicking((prev) => !prev);
    pickingNowType && setType(pickingNowType);
  };

  return (
    <LocalizationProvider utils={DateFnsUtils} dateAdapter={DateFnsUtils}>
      <CustomDateTextField value={value} togglePicking={handleTogglePicking} />
      <DatePicker
        value={value}
        onChange={handler}
        animateYearScrolling
        open={isPicking}
        openTo={type}
        onClose={handleTogglePicking}
        minDate={minDate}
        maxDate={maxDate}
        style={{ display: 'none' }}
        views={['date', 'month', 'year']}
      />
    </LocalizationProvider>
  );
};

export default EduDatePicker;
