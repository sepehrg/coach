import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  content: {
    backgroundColor: '#F5F8FF',
    flexGrow: 1,
    borderRadius: 30,
    margin: '70px 60px 0',
    [theme.breakpoints.down('md')]: {
      margin: '50px 30px 0',
    },
  },
  rows: {
    justifyContent: 'center',
  },
  title: {
    color: '#0B2352',
    padding: 10,
    [theme.breakpoints.down('md')]: {
      fontSize: 19,
    },
  },
  divider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    textAlign: 'center',
  },
  root: {},
  arrowImg: {
    width: 28,
    height: 24,
  },
  timerContainer: { width: '100%', height: '100%', textAlign: 'center' },
  timerBox: {
    height: '95%',
    width: '100%',
    background: '#F2F5F7',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCountText: { fontSize: 48, margin: '25px 0px' },
  sessionGoalInput: { width: '87.5%', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.1);' },
  subjectsContainer: {
    paddingBottom: 25,
    marginTop: 26,
  },
  buttonsItem: {
    textAlign: 'center',
    margin: 35,
  },
  startButton: {
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    borderRadius: 90,
    padding: '20px 30px',
    lineHeight: 1,
    fontFamily: 'Montserrat',
    width: 239,
    transition: 'all 0.3s ease-in-out',
    '&:disabled': {
      color: 'gray',
      opacity: 0.7,
    },
  },
}));

export default useStyles;
