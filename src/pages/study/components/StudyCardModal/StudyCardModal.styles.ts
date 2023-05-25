import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    background: theme.palette.common.white,
    width: '500px',
    height: '500px',
    left: '100vw',
    position: 'absolute',
    top: 80,
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    zIndex: 100,
    borderRadius: 10,
  },
  animationSlideIn: {
    animation: '$slideIn 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
  animationSlideOut: {
    animation: '$slideOut 2s ease-out both',
  },
  animationFlip: {
    animation: '$animateFlip 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
  },
  calculatorBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  cardWrapper: {
    width: 300,
    height: 200,
    borderRadius: 10,
    background: theme.palette.secondary.light,
    margin: 15,
    position: 'relative',
  },
  cardWrapperExtended: {
    height: 340,
  },
  cardButton: {
    width: 140,
    background: 'rgba(0, 0, 0, 0.15)',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.15)',
    },
    height: 50,
    color: theme.palette.common.white,
  },
  arrowButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    minWidth: 30,
    maxWidth: 30,
    height: 60,
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
    zIndex: 100,
    background: theme.palette.secondary.dark,
  },
  buttonsWrapper: {
    width: 300,
    marginTop: 10,
  },
  turnIcon: {
    width: 40,
  },
  '@keyframes slideIn': {
    '0%': {
      transform: 'translateX(0)',
      position: 'absolute',
      top: 80,
    },
    '100%': {
      transform: 'translateX(-550px)',
      position: 'absolute',
      top: 80,
      zIndex: 100,
    },
  },
  '@keyframes slideOut': {
    '0%': {
      transform: 'translateX(0)',
      position: 'absolute',
      top: 80,
    },
    '100%': {
      transform: 'translateX(550px)',
      position: 'absolute',
      top: 80,
    },
  },
  '@keyframes animateFlip': {
    '0%': {
      transform: 'rotateY(0)',
    },
    '100%': {
      transform: 'rotateY(180deg)',
    },
  },
}));

export default useStyles;
