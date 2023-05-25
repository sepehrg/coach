import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  darkened: {
    background: 'rgba(39, 46, 56, 0.3)',
    pointerEvents: 'auto',
  },
  messageBox: {
    position: 'absolute',
    left: 50,
    top: 80,
    padding: '5px 20px',
    minHeight: 70,
    width: 130,
  },
  wrapper: {
    position: 'relative',
    pointerEvents: 'initial',
  },
  idoImage: {
    height: 550,
  },
  positionCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  positionCenterLeft: {
    position: 'absolute',
    top: '50%',
    left: '5%',
    transform: 'translate(0, -50%)',
  },
  positionBottomRight: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
  },
  positionBottomLeft: {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
  },
  closeBtn: {
    position: 'absolute',
    top: 150,
    right: 100,
    width: 20,
    height: 20,
  },
  slideInBottomLeft: {
    animation: '$slideInBottomLeft 3s ',
  },
  slideInBottomRight: {
    animation: '$slideInBottomRight 3s ',
  },
  slideInCenterLeft: {
    animation: '$slideInCenterLeft 3s ',
  },
  fadeInCenter: {
    animation: '$fadeInCenter 1s',
  },
  growInCenter: {
    animation: '$growInCenter 3s',
  },

  slideOutBottomLeft: {
    animation: '$slideOutBottomLeft 3s ',
  },
  slideOutBottomRight: {
    animation: '$slideOutBottomRight 3s ',
  },
  slideOutCenterLeft: {
    animation: '$slideOutCenterLeft 3s ',
  },
  fadeOutCenter: {
    animation: '$fadeOutCenter 1s',
  },
  growOutCenter: {
    animation: '$growOutCenter 3s',
  },

  '@keyframes slideInBottomLeft': {
    '0%': {
      transform: 'translateY(350px)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
  '@keyframes slideInBottomRight': {
    '0%': {
      transform: 'translateY(350px)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
  '@keyframes slideInCenterLeft': {
    '0%': {
      transform: 'translate(-350px, -50%)',
    },
    '100%': {
      transform: 'translate(0, -50%)',
    },
  },
  '@keyframes fadeInCenter': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  '@keyframes growInCenter': {
    '0%': {
      transform: 'scale(0,0) translate(-50%, -50%)',
    },
    '100%': {
      transform: 'scale(1,1) translate(-50%, -50%)',
    },
  },

  '@keyframes slideOutBottomLeft': {
    '0%': {
      transform: 'translateY(0)',
    },
    '100%': {
      transform: 'translateY(-350px)',
    },
  },
  '@keyframes slideOutBottomRight': {
    '0%': {
      transform: 'translateY(0)',
    },
    '100%': {
      transform: 'translateY(-350px)',
    },
  },
  '@keyframes slideOutCenterLeft': {
    '0%': {
      transform: 'translate(0, -50%)',
    },
    '100%': {
      transform: 'translate(350px, -50%)',
    },
  },
  '@keyframes fadeOutCenter': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
  '@keyframes growOutCenter': {
    '0%': {
      transform: 'scale(1,1) translate(-50%, -50%)',
      background: '#b50b9a',
    },
    '100%': {
      opacity: 0,
      transform: 'scale(0,0) translate(-50%, -50%)',
    },
  },
});

export default useStyles;
