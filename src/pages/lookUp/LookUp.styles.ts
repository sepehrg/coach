import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: '32px 60px',
    height: '100vh',
  },
  topWrapper: {
    maxWidth: '100vw',
    marginBottom: 40,
  },
  subject: {
    color: '#0091FF',
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
  },
  topicsContainer: {
    overflow: 'auto',
    maxHeight: '30vh',
    width: 590,
  },
}));

export default useStyles;
