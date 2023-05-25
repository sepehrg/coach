import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    margin: '0 auto',
    width: 1366,
    [theme.breakpoints.down('md')]: {
      width: 1080,
    },
  },
}));

export default useStyles;
