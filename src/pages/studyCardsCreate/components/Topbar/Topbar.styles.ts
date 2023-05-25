import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    position: 'relative',
    marginLeft: 27,
  },
  shadowBox: {
    background: 'rgba(97, 108, 181, 0.3)',
    opacity: 0.6,
    filter: 'blur(35px)',
    borderRadius: 30,
    width: '100%',
    height: 101,
    position: 'absolute',
    zIndex: -1,
  },
  input: {
    width: 300,
    height: 56,
    borderRadius: 9,
    outline: 'none',
    paddingLeft: 18,
    fontSize: 16,
    fontFamily: 'Helvetica',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    marginRight: 15,
    [theme.breakpoints.down('md')]: {
      width: 250,
    },
  },
  tagsInput: {
    height: 30,
    fontSize: 14,
  },
  root: {
    margin: '10px 10px 10px 0px',
  },
  switchBase: {
    '&$checked': {
      color: '#6DDA00',
      '& + $track': {
        backgroundColor: '#B2CB9A',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#4BE06C',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 20,
    height: 20,
    transform: 'translateY(-2px)',
  },
  track: {
    width: 40,
    height: 12,
  },
  checked: {},
  focusVisible: {},
  saveBtn: {
    width: 100,
    height: 37,
    marginLeft: 20,
  },
  inputBarWrapper: {
    padding: '19px 23px',
    alignItems: 'center',
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    borderRadius: 30,
    marginTop: 30,
    [theme.breakpoints.down('md')]: {
      padding: '14px 17px',
    },
  },
  infoBtn: {
    color: theme.palette.primary.main,
  },
  infoIcon: {
    fontSize: 28,
  },
  infoBox: {
    width: 300,
    height: 245,
    padding: 25,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: '12px',
  },
  infoPicture: {
    height: 135,
    marginLeft: 38,
    marginTop: 10,
  },
}));

export default useStyles;
