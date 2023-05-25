import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    borderRadius: 9,
    outline: 'none',
    fontFamily: 'Helvetica',
    height: 56,
    fontSize: 16,
    overflowY: 'hidden',
    padding: '3px 0 0  18px',
    overflowX: 'scroll',
    width: 490,
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'transparent!important',
    },
    [theme.breakpoints.down('md')]: {
      width: 306,
    },
  },
  container: {
    overflowY: 'hidden',
    boxShadow: '0px 4px 4px rgb(0 0 0 / 15%)',
    borderRadius: 9,
  },
  suggestionsWrapper: {
    width: 490,
    borderRadius: 5,
    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
    padding: '14px 0 15px 20px',
    marginLeft: 8,
    maxHeight: '24vh',
    overflowY: 'scroll',
    position: 'absolute',
    top: 85,
    left: 330,
    background: '#FFF',
    zIndex: 10,
    [theme.breakpoints.down('md')]: {
      left: 274,
      width: 306,
    },
  },
  suggestion: {
    height: 33,
    marginBottom: 5,
  },
  searchIcon: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  chip: {
    marginRight: 5,
    background: 'rgba(63,143,247,0.15)',
  },
}));

export default useStyles;
