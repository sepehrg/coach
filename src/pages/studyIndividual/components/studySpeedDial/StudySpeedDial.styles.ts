import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  speedDial: {
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  speedDialAction: {
    padding: 30,
    '& img': {
      width: 60,
    },
  },
}));

export default useStyles;
