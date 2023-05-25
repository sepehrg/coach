import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    flexDirection: 'column',
    padding: '25px 70px 40px 50px',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '24px',
  },
  searchWrapper: {
    marginTop: 44,
    boxShadow: '2px 6px 12px #c7cdf1',
    borderRadius: 40,
  },
  editBtn: {
    marginLeft: 15,
    background: 'linear-gradient(0deg, #A32561 -3.08%, #D9257C 24.94%, #D9247B 61.11%)',
    color: '#ffffff',
  },
  listWrapper: {
    height: 380,
    marginTop: 25,
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
    paddingLeft: 30,
    alignItems: 'center',
  },
  searchClearBtn: {},
  emptyImg: {
    maxWidth: 700,
    marginTop: 18,
  },
}));

export default useStyles;
