import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  dialog: {
    borderRadius: 28,
    paddingTop: 25,
  },
  backdrop: {
    opacity: '0.7 !important',
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  root: {
    width: 510,
    height: 417,
    [theme.breakpoints.down('md')]: {
      width: 447,
      height: 381,
    },
  },
  timeSpent: {
    font: '500 23px system-ui',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  countdown: {
    padding: 50,
  },
  youSure: {
    font: '500 20px system-ui',
  },
  button: {
    padding: '10px 26px',
    fontFamily: 'Montserrat',
  },
  red: {
    background: 'linear-gradient(0deg, #AD0000 -3.08%, #D21617 24.94%, #FA4444 61.11%)',
  },
  purple: {
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  buttonContainer: {
    width: '90%',
    marginTop: 50,
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default useStyles;
