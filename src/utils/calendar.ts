import moment from 'moment';

export const getSpecificDate = (month: number, dayOfMonth: number, year: number) =>
  moment(`${month}-${dayOfMonth}-${year}`, 'MM-DD-YYYY').toDate();
export const getDayOfMonth = (date: Date) => moment(date).date();
const getDaysInMonth = (month: number, year: number) =>
  moment(`${month}-${year}`, 'MM-YYYY').daysInMonth();
export const getMonth = (date: Date) => moment(date).month();
export const getYear = (date: Date) => moment(date).year();
export const getToday = () => moment().toDate();
export const getReadableWeekday = (date: Date) => moment(date).format('dddd');
export const getReadableMonthDate = (date: Date) => moment(date).format('MMMM Do');
export const getMonthDayYear = (date: Date) => moment(date).format('MM-DD-YYYY');
export const getFirstWeekdayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};
export const getDatesInMonthDisplay = (month: number, year: number): Date[] => {
  const daysInMonth = getDaysInMonth(month, year);
  const result = [];
  for (let i = 1; i <= daysInMonth; i++) {
    result.push(moment(`${month}-${i}-${year}`, 'MM-DD-YYYY').toDate());
  }
  return result;
};
export const formatToGetRequest = (date: Date): { today: string; tomorrow: string } => {
  const today = moment(date).format('YYYY-MM-DD');
  const tomorrow = moment(date).add(1, 'd').format('YYYY-MM-DD');
  return { today, tomorrow };
};

export const monthToGetRequest = (month: number): { today: string; tomorrow: string } => {
  const today = moment([2020, month]);
  const tomorrow = moment(today).endOf('month');
  return {
    today: moment(today).format('YYYY-MM-DD'),
    tomorrow: moment(tomorrow).format('YYYY-MM-DD'),
  };
};

export const rangeToGetRequest = (date: Date): { today: string; tomorrow: string } => {
  const today = moment(date).format('YYYY-MM-DD');
  const tomorrow = moment(date).add(7, 'day').format('YYYY-MM-DD');
  return { today, tomorrow };
};
