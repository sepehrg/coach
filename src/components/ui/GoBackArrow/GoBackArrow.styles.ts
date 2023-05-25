import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: { padding: 5 },
  img: {
    width: 24,
    height: 24,
    marginRight: 3,
    alignSelf: 'center',
    cursor: 'pointer',
    padding: 0,
  },
});

export default useStyles;
