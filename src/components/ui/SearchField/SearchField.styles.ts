import { makeStyles } from 'tss-react/mui';
import { SearchIcon } from './assets';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    maxHeight: 56,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '24px',
      height: '24px',
      marginLeft: '12px',
      backgroundImage: `url(${SearchIcon})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
  },
  autocompleteBox: {
    display: 'none',
    position: 'absolute',
    width: 634,
    boxShadow: '0px 0px 4px rgba(39, 53, 61, 0.12)',
    borderRadius: 5,
    transition: 'all',
    transitionDuration: '0.5s',
    background: theme.palette.common.white,
  },
  autoCompleteBoxActive: {
    display: 'block',
  },
  recentItemBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 12px',
    cursor: 'pointer',
    transition: 'all',
    transitionDuration: '.5s',
    borderRadius: 5,
    '&:hover': {
      background: '#DCE2E6',
    },
  },
  recentIconTitleBox: {
    display: 'flex',
    alignItems: 'center',
  },
  recentIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  lengthError: {
    color: 'red',
    marginLeft: 10,
  },
}));

export default useStyles;
