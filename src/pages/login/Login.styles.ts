import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    height: '100vh',
  },
  bigSpace: {
    marginBottom: '32px',
  },
  smallSpace: {
    marginBottom: '12px',
  },
  linkText: {
    color: '#0091FF',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  fullWidth: {
    width: '100%',
  },
});

export default useStyles;
