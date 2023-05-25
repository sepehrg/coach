import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: 496,
    height: 481,
  },
  container: {
    flexDirection: 'column',
  },
  cardItem: {
    position: 'relative',
    height: 404,
  },
  question: {
    height: '100%',
  },
  backdrop: {
    opacity: '0 !important',
  },
  dialog: {
    borderRadius: 28,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    bottom: 0,
    right: '12%',
    [theme.breakpoints.down('md')]: {
      right: '8%',
    },
  },
  cardButtons: {
    justifyContent: 'space-between',
  },
  backButton: {
    height: 35,
  },
  cardButton: {
    width: 76,
    height: 35,
  },
  grey: {
    background: 'linear-gradient(113.19deg, #A1AAB3 9.75%, #B3CBE3 94.03%)',
    '&:hover': {
      opacity: 0.85,
    },
    margin: '0 auto',
  },
  plusBtn: {
    fontSize: 36,
    color: '#D9247B',
    marginLeft: 20,
    padding: 0,
  },
}));

export default useStyles;
