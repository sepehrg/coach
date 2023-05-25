import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    height: 456,
    width: 510,
  },
  container: {
    flexDirection: 'column',
    padding: 30,
  },
  title: {
    font: '700 20px Helvetica',
    marginBottom: 40,
  },
  backdrop: {
    opacity: '0.7 !important',
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  dialog: {
    borderRadius: 28,
  },
}));

export default useStyles;
