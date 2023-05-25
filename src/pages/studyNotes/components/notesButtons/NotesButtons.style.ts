import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  topButtons: {
    justifyContent: 'right',
    margin: '34px 17px',
    gap: '9px',
    [theme.breakpoints.down('md')]: {
      width: 491,
      margin: '28px 13px',
    },
  },
  navigation: {
    minWidth: 19,
    padding: 0,
  },
  arrow: {
    width: '2em',
    height: '2em',
  },
  pinkButton: {
    padding: 5,
    width: 135,
    [theme.breakpoints.down('md')]: {
      width: 98,
    },
  },
  purpleButton: {
    padding: 5,
    width: 100,
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    [theme.breakpoints.down('md')]: {
      width: 90,
    },
  },
}));

export default useStyles;
