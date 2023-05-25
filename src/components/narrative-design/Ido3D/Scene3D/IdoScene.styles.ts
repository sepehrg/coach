import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    flexWrap: 'nowrap',
  },
  ido: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 2,
    margin: '0 auto',
  },
}));

export default useStyles;
