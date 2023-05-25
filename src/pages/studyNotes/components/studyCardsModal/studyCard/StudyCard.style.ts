import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
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
}));

export default useStyles;
