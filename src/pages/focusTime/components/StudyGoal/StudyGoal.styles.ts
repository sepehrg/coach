import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  goalContainer: {
    padding: '40px 20px',
    [theme.breakpoints.down('md')]: {
      padding: '25px 20px',
    },
  },
  item: {
    margin: '0 4px',
    flex: '1 1 0px',
    flexGrow: 1,
  },
}));

export default useStyles;
