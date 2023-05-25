import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    width: 586,
    [theme.breakpoints.down('md')]: {
      width: 460,
    },
  },
  createCard: {
    [theme.breakpoints.down('md')]: {
      width: 438,
    },
  },
  container: {
    flexDirection: 'column',
  },
  searchBar: {},
  searchClearBtn: {
    top: 23,
    [theme.breakpoints.down('md')]: {
      top: 12,
    },
  },
}));

export default useStyles;
