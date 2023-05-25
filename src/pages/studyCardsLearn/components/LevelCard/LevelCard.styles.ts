import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    width: 222,
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    padding: '40px 24px 65px',
    transition: 'background',
    transitionDuration: '.5s',
    boxShadow: 'rgb(188 193 232 / 30%) 0px 11px 13px',
    '&:active': {
      backgroundColor: '#ececec',
      cursor: 'pointer',
    },
    '&:hover': {
      backgroundColor: '#ececec',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
      width: 164,
    },
  },
  number: {
    fontFamily: 'Helvetica',
    fontSize: 48,
    fontWeight: 400,
    marginBottom: 5,
    color: '#545454',
    [theme.breakpoints.down('md')]: {
      fontSize: 35,
    },
  },
  cardsText: {
    fontSize: 21,
    marginBottom: 40,
    marginTop: 12,
    color: '#545454',
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
    },
  },
  levelTitle: {
    marginTop: 20,
    fontFamily: 'Helvetica',
    fontWeight: 400,
    fontSize: 20,
    color: '#390B52',
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
    },
  },
  iconWrapper: {
    width: '100px',
    height: '90px',
    '& img': {
      [theme.breakpoints.down('md')]: {
        width: 150,
      },
    },
  },
}));

export default useStyles;
