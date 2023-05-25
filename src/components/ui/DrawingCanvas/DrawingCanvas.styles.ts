import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  canvas: {
    padding: 11,
    borderRadius: 15,
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    bottom: -35,
    right: 39,
    color: '#7c7c7c',
  },
}));

export default useStyles;
