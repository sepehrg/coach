import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dateBox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 47,
    height: 47,
    transition: 'all',
    borderRadius: 50,
    transitionDuration: '0.5s',
    cursor: 'pointer',
    '&:hover': {
      background: '#F2F5F7',
    },
  },
  emptyDateBox: {
    transition: 'none',
    cursor: 'auto',
    '&:hover': {
      background: theme.palette.common.white,
    },
  },
  dotConsist: {
    width: 6,
    height: 6,
    background: '#FFBBB8',
    borderRadius: '50%',
    position: 'absolute',
    bottom: 4,
    left: 20,
  },
  dateBoxActive: {
    background: '#FF7771',
    '&:hover': {
      background: '#FF7771',
    },
  },
  dateBoxConsist: {
    background: 'green',
  },
  dateTextActive: {
    color: theme.palette.common.white,
  },
}));

export default useStyles;
