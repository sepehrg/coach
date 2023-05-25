import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    padding: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '24px',
  },
  listWrapper: {
    height: 380,
    marginTop: 50,
    '&:focus-visible': {
      outline: 'none',
    },
  },
  list: {
    '&:focus-visible': {
      outline: 'none',
    },
  },
});

export default useStyles;
