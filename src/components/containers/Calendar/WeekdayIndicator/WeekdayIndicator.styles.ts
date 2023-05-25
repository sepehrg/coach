import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: 44,
    height: 44,
    textAlign: 'center',
    color: '#B3B4BD',
  },
});

export default useStyles;
