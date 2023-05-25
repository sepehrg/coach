import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dayBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 48,
    height: 82,
    borderRadius: 24,
    background: theme.palette.common.white,
    margin: '0px 8px',
    cursor: 'pointer',
    '&:hover': {
      background: '#F2F5F7',
    },
  },
  dayBoxActive: {
    background: '#FF7771',
    '&:hover': {
      background: '#FF7771',
    },
  },
  daysContainer: {
    display: 'flex',
  },
  buttonsContainer: {
    display: 'flex',
  },
  arrowImg: {
    width: 24,
    height: 24,
    padding: 10,
  },
  arrowBox: {
    background: '#F2F5F7',
    borderRadius: 5,
    margin: '0 2px',
  },
  weekDayDate: {
    fontSize: 14,
  },
  weekDayName: {
    color: '#B3B4BD',
  },
  weekDayNameActive: {
    color: theme.palette.common.white,
  },
  dotConsist: {
    width: 6,
    height: 6,
    background: '#FFBBB8',
    borderRadius: '50%',
    position: 'absolute',
    bottom: 7,
    left: 21,
  },
}));

export default useStyles;
