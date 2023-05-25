import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    margin: '0px 10px',
    display: 'flex',
    alignItems: 'center',
  },
  likeIcon: {
    margin: '0px 3px',
    transform: 'scale(1.2)',
    padding: 5,
  },
  likeWrapper: {
    margin: '0 8px',
  },
});

export default useStyles;
