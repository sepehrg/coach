import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  main: {
    backgroundColor: '#F5F8FF',
    margin: '10px 6px',
    borderRadius: 30,
    borderBottom: '9px solid #c8ccec',
    boxShadow: 'rgb(188 193 232 / 30%) 0px 11px 13px',
  },
  container: {
    height: '53vh',
  },
  header: {
    width: '100%',
    height: 110,
    padding: '4px 32px 10px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  iconButton: {
    marginRight: 5,
  },
  card: {
    width: 995,
    height: 544,
    background: theme.palette.secondary.main,
    margin: '25px 0 35px',
    [theme.breakpoints.down('md')]: {
      width: 600,
    },
  },
  cardButton: {
    width: 140,
  },
  cardText: {
    width: '100%',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    padding: 20,
  },
  red: {
    background: 'linear-gradient(0deg, #AD0000 -3.08%, #D21617 24.94%, #FA4444 61.11%)',
    '&:hover': {
      opacity: 0.85,
    },
  },
  green: {
    background: 'linear-gradient(360deg, #098524 5.43%, #0AB02F 29.94%, #04D131 65.76%)',
    '&:hover': {
      opacity: 0.85,
    },
  },
  grey: {
    background: 'linear-gradient(113.19deg, #A1AAB3 9.75%, #B3CBE3 94.03%)',
    '&:hover': {
      opacity: 0.85,
    },
    margin: '0 auto',
  },
  buttonsWrapper: {
    width: 600,
    margin: '30px 0 20px',
    height: 60,
  },
  progressBarWrapper: {
    flexGrow: 1,
    alignSelf: 'center',
    margin: 15,
  },
  progressBar: {
    filter: 'drop-shadow(0px 4px 23px rgba(0, 0, 0, 0.15))',
  },
  close: {
    marginTop: -14,
    marginLeft: -14,
    padding: 7,
  },
  animationFlip: {
    animation: '$animateFlip 0.6s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
  },
  animationLeft: {
    animation: '$animateSlideLeft 0.8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
  },
  animationRight: {
    animation: '$animateSlideRight 0.8s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
  },

  '@keyframes animateFlip': {
    '0%': {
      transform: 'rotateY(0)',
    },
    '100%': {
      transform: 'rotateY(180deg)',
    },
  },
  '@keyframes animateSlideLeft': {
    '0%': {
      transform: 'translateX(0)',
      opacity: 1,
    },
    '100%': {
      transform: 'translateX(-1000px)',
      opacity: 0,
    },
  },
  '@keyframes animateSlideRight': {
    '0%': {
      transform: 'translateX(0)',
      opacity: 1,
    },
    '100%': {
      transform: 'translateX(1000px)',
      opacity: 0,
    },
  },
}));

export default useStyles;
