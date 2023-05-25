import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  pageWrapper: {
    height: '64vh',
    marginTop: 26,
  },
  clockWrapper: {
    marginTop: 40,
  },
  clockInnerWrapper: {
    position: 'relative',
  },
  backBtn: {
    width: 52,
    height: 52,
    backgroundColor: '#F2F5F7',
    position: 'absolute',
    left: '15%',
  },
  backBtnImage: {
    width: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '24px',
    marginTop: 20,
  },
  arrowButton: {
    position: 'absolute',
    width: 52,
    height: 52,
    backgroundColor: '#F2F5F7',
    left: '40%',
    '&:hover': {
      backgroundColor: '#0091FF',
      '& img': {
        filter: 'invert(100) sepia(0) saturate(1) hue-rotate(0deg) brightness(5)',
      },
    },
  },
  buttonUp: {
    top: 50,
  },
  buttonDown: {
    bottom: 44,
  },
  clockText: {
    fontFamily: 'Montserrat',
    background: 'none',
    outline: 'none',
    border: 'none',
    width: '100%',
    fontSize: 48,
    fontWeight: 600,
    margin: '22px 0px',
    textAlign: 'center',
  },
  clockTextWrapper: {
    width: '100%',
    position: 'absolute',
    top: 90,
    display: 'flex',
    flexDirection: 'row',
    alignItems: '',
  },
  setTimeBtn: {
    marginTop: 50,
  },
  timeButton: {
    width: 168,
    fontSize: 20,
    fontWeight: 600,
    margin: '17px 0 17px 40px',
  },
});

export default useStyles;
