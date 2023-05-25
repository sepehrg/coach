import { makeStyles } from 'tss-react/mui';
import { LockIcon } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    marginTop: 40,
  },
  levelItem: {
    width: '33%',
    textAlign: 'center',
  },
  levelContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    position: 'relative',
    width: 207,
    height: 207,
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    [theme.breakpoints.down('md')]: {
      width: 180,
      height: 180,
    },
  },
  lockedLevel: {
    opacity: 0.2,
  },
  lockIcon: {
    position: 'absolute',
    background: `url(${LockIcon}) no-repeat center center`,
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  level: {
    marginTop: 50,
    [theme.breakpoints.down('md')]: {
      marginTop: 30,
    },
  },
  levelText: {
    fontSize: 21,
    '& span': {
      fontWeight: 600,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
    },
  },
  scoreContainer: {
    flexDirection: 'column',
    height: 92,
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      height: 40,
    },
  },
  finishedItem: {
    padding: 10,
  },
  finished: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: 22,
    color: '#EC839F',
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
    },
  },
  scoreBox: {
    display: 'flex',
    alignItems: 'baseline',
  },
  currentScore: {
    fontSize: 26,
    [theme.breakpoints.down('md')]: {
      fontSize: 23,
    },
  },
  topScore: {
    fontSize: 15,
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
    },
  },
}));

export default useStyles;
