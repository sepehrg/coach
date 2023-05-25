import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  sidebar: {
    margin: 22,
  },
  menuButton: {
    color: '#FFFFFF',
    fontSize: 19,
    padding: '7px 22px',
    margin: 6,
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  menuLabel: {
    '& img': {
      marginRight: 10,
    },
  },
}));

export default useStyles;
