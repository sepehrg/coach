import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  emptyImage: {
    marginTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '24px',
  },
  searchWrapper: {
    marginTop: 15,
  },
  listWrapper: {
    height: 320,
    marginTop: 10,
    '&:focus-visible': {
      outline: 'none',
    },
  },
  list: {
    '&:focus-visible': {
      outline: 'none',
    },
  },
  searchBar: {
    height: 42,
    paddingLeft: 18,
  },
  searchClearBtn: {
    top: 9,
  },
  emptyImg: {
    maxWidth: 700,
    marginTop: 18,
  },
  gradesWrapper: {
    marginTop: 25,
    marginBottom: 20,
  },
});

export default useStyles;
