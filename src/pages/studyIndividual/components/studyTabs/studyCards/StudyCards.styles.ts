import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  searchWrapper: {
    marginTop: 20,
    boxShadow: '2px 6px 12px #c7cdf1',
    borderRadius: 40,
  },
  listWrapper: {
    maxHeight: 'calc(100vh - 300px)',
    overflowY: 'scroll',
    marginTop: 25,
  },
  searchBar: {
    paddingLeft: 30,
    alignItems: 'center',
  },
  searchClearBtn: {},
}));

export default useStyles;
