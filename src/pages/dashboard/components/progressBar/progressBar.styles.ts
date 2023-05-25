import { makeStyles } from 'tss-react/mui';
import { ProgressLeft, Progress } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  container: {
    width: '100%',
    height: 43,
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    borderRadius: 40,
    marginTop: 10,
    [theme.breakpoints.down('md')]: {
      height: 33,
      marginTop: 0,
    },
  },
  barLeft: {
    width: '100%',
    height: '100%',
    background: `url(${ProgressLeft}) no-repeat left`,
    marginLeft: -1,
    position: 'relative',
    paddingLeft: 31,
    [theme.breakpoints.down('md')]: {
      backgroundSize: 24,
      paddingLeft: 25,
    },
  },
  bar: {
    height: '100%',
    background: `url(${Progress}) right`,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  percent: {
    textAlign: 'center',
    color: '#ffffff',
    padding: 2,
    marginTop: 7,
    position: 'absolute',
    left: '50%',
    background: '#1f1952',
    borderRadius: '25%',
    [theme.breakpoints.down('md')]: {
      marginTop: 3,
    },
  },
}));

export default useStyles;
