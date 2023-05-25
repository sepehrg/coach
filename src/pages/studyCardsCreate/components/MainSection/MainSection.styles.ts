import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    overflow: 'hidden',
    height: 688,
  },
  containerWrapper: {
    height: '100%',
    margin: '44px 0 0 27px',
    background: 'linear-gradient(90deg, #C7CDF1 2.01%, #BABFE7 98.29%)',
    borderRadius: '47px 0px 0px 0px',
    boxShadow: '-4px 5px 19px 5px #cfd3ed',
    [theme.breakpoints.down('md')]: {
      margin: '24px 0 0 27px',
    },
  },
  container: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(145.6deg, #E4EFFA 42.81%, #B3CBE3 106.22%)',
    borderRadius: '41px 0px 0px 0px',
    margin: '3px 0 0 5px',
  },
  plusBtn: {
    fontSize: 56,
    color: '#D9247B',
  },
  cardWrapper: {
    width: 456,
    height: 460,
    borderRadius: 30,
    background: '#F9F9F9',
    margin: 15,
    position: 'relative',
    boxShadow: '0px 13px 19px 5px #cfd3ed',
    [theme.breakpoints.down('md')]: {
      width: 385,
      height: 412,
    },
  },
  leftCardAnimation: {
    animation: '$animateLeftCard 3s ',
  },
  rightCardAnimation: {
    animation: '$animateRightCard 3s ',
  },
  cardWrapperExtended: {
    // height: 340,
  },
  input: {
    outline: 'none',
    background: 'transparent',
    border: 'none',
    margin: 18,
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  fingerprintBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  calculatorBtn: {
    position: 'absolute',
    bottom: 5,
    right: 40,
  },
  drawBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },

  '@keyframes animateLeftCard': {
    '25%': {
      opacity: 1,
      transform: 'translateY(20%) scale(0.5, 0.5)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate(-35%, -20%) scale(0.4, 0.4)',
      zIndex: 1,
    },
  },
  '@keyframes animateRightCard': {
    '25%': {
      opacity: 1,
      transform: 'translate(20%, -5%) scale(0.5, 0.5)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate(-135%, -20%) scale(0.4, 0.4)',
    },
  },
}));

export default useStyles;
