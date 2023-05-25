import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: '30px 35px',
    overflowY: 'hidden',
  },
  progressBarWrapper: {
    height: 32,
    borderRadius: '15px',
    backgroundColor: theme.palette.secondary.main,
  },
  progressBar: {
    backgroundColor: '#5CE672',
    borderRadius: '15px',
  },
  levelsWrapper: {
    margin: '80px 0 20px',
    [theme.breakpoints.down('md')]: {
      margin: '45px 0 10px',
    },
  },
  divider: {
    borderLeft: `3px solid ${theme.palette.divider}`,
    paddingLeft: 27,
    marginRight: '0 !important',
  },
  card: {
    marginRight: 36,
  },
}));

export default useStyles;
