import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    display: 'flex',
    alignItem: 'center',
    cursor: 'pointer',
  },
  icon: {
    width: '24px',
    height: '24px',
    marginRight: '5px',
  },
  text: {},
});

export default useStyles;
