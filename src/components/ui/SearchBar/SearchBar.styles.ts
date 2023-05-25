import { makeStyles } from 'tss-react/mui';
import { SearchButton } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: 67,
    background: 'linear-gradient(269.84deg, #F5F8FF 2.56%, #F2F5FE 95.93%)',
    borderRadius: 40,
    paddingLeft: 34,
    boxShadow: '2px 3px 10px #c7cdf1',
    [theme.breakpoints.down('md')]: {
      height: 51,
    },
  },
  container: {
    position: 'relative',
  },
  input: {
    width: '90%',
    lineHeight: '24px',
    borderRadius: 13,
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: 18,
    border: 'none',
    outline: 'none',
    borderBottom: 'none',
    background: 'linear-gradient(269.84deg, #F5F8FF 2.56%, #F2F5FE 95.93%)',
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
  },
  resultsWrapper: {
    position: 'absolute',
    width: '101%',
    borderRadius: 5,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    paddingTop: 14,
    marginLeft: 1,
    paddingBottom: 47,
    maxHeight: '40vh',
    overflowY: 'scroll',
    background: '#F5F8FF',
    zIndex: 1,
  },
  button: {
    position: 'absolute',
    right: 0,
    height: '100%',
    top: 0,
    width: 69,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    background: `url(${SearchButton}) no-repeat right`,
    [theme.breakpoints.down('md')]: {
      width: 53,
      minWidth: 53,
      backgroundSize: 52,
    },
  },
  searchItem: {
    height: 33,
    padding: '5px 12px',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'row',
    '&:hover': {
      backgroundColor: 'rgba(196, 196, 196, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
    },
  },
  clearButton: {
    position: 'absolute',
    right: 90,
    height: 16,
    width: 16,
    [theme.breakpoints.down('md')]: {
      right: 56,
    },
  },
}));

export default useStyles;
