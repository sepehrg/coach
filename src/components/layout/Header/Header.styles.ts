import { makeStyles } from 'tss-react/mui';
import { EduDropIcon, IdoTop } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  root: {
    flexWrap: 'nowrap',
  },
  column: {
    width: 188,
    marginTop: 23,
  },
  greeting: {
    width: 823,
    height: 137,
    padding: '25px',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      width: 640,
      height: 115,
    },
  },
  greetingUl: {
    listStyleImage: `url(${EduDropIcon})`,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.5,
    paddingLeft: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: 19,
    },
  },
  typewriter: {
    // overflow: 'hidden', //disbled for now
    whiteSpace: 'nowrap',
    letterSpacing: '.05em',
    animation: '$typing 1s steps(30, end)',
  },
  '@keyframes typing': {
    from: { width: 0 },
    to: { width: '100%' },
  },
  ido: {
    background: `url(${IdoTop}) left top no-repeat`,
    width: 1178,
    height: 440,
    [theme.breakpoints.down('md')]: {
      width: 933,
      backgroundSize: 956,
    },
  },

  linksBox: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    fontSize: 14,
    margin: '0 22px',
  },
  linkTitle: {
    color: '#B3B4BD',
  },
  linkTitleActive: {
    color: '#383541',
  },

  imgBox: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  notificationImgBox: {
    marginRight: 15,
  },
  notificationImg: {
    width: 24,
    height: 24,
    padding: 10,
  },
  profileImg: {
    width: 40,
    height: 40,
    padding: 3,
  },
  lngBox: {
    '&:hover': {
      background: '#DCE2E6',
    },
  },
  selectInput: {
    '&:focus': { background: 'none' },
  },
  starWrapper: {
    marginRight: 33,
    marginTop: 5,
    width: 44,
    height: 44,
    position: 'relative',
  },
  starInnerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 37,
    height: 38,
    display: 'flex',
  },
  starNumber: {
    color: '#CD8000',
    fontWeight: 'bold',
    fontSize: 12,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stage: {
    display: 'flex',
    margin: '18px 0 0 34px',
  },
  dotTyping: {
    position: 'relative',
    left: -9999,
    width: 2,
    height: 2,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    color: '#ffffff',
    boxShadow: '9989px 0 0 0 #ffffff, 9999px 0 0 0 #ffffff, 10009px 0 0 0 #ffffff',
    animation: '$dotTyping 1.5s infinite linear',
  },
  '@keyframes dotTyping': {
    '0%': {
      boxShadow: '9989px 0 0 0 #ffffff, 9999px 0 0 0 #ffffff, 10009px 0 0 0 #ffffff',
    },
    '16.667%': {
      boxShadow: '9989px -10px 0 0 #ffffff, 9999px 0 0 0 #ffffff, 10009px 0 0 0 #ffffff',
    },
    '33.333%': {
      boxShadow: '9989px 0 0 0 #ffffff, 9999px 0 0 0 #ffffff, 10009px 0 0 0 #ffffff',
    },
    '50%': {
      boxShadow: '9989px 0 0 0 #ffffff, 9999px -10px 0 0 #ffffff, 10009px 0 0 0 #ffffff',
    },
    '66.667%': {
      boxShadow: '9989px 0 0 0 #ffffff, 9999px 0 0 0 #ffffff, 10009px 0 0 0 #ffffff',
    },
    '83.333%': {
      boxShadow: '9989px 0 0 0 #ffffff, 9999px 0 0 0 #ffffff, 10009px -10px 0 0 #ffffff',
    },
    '100%': {
      boxShadow: '9989px 0 0 0 #ffffff, 9999px 0 0 0 #ffffff, 10009px 0 0 0 #ffffff',
    },
  },
}));

export default useStyles;
