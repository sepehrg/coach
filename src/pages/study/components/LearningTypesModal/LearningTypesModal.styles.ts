import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {},
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: 400,
    height: 600,
  },
  button: {
    background: '#F2F5F7',
  },
});

export default useStyles;
