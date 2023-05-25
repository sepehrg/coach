import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    position: 'relative',
    display: 'flex',
  },
  icon: {
    position: 'absolute',
    width: '24px',
    height: '24px',
    right: '12px',
    top: '16px',
    cursor: 'pointer',
  },
});

export default useStyles;
