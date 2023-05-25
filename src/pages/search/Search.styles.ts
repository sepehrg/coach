import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  topWrapper: {
    marginBottom: 10,
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  search: {
    marginLeft: 20,
  },
  frame: {
    position: 'relative',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    minWidth: 30,
    padding: 5,
  },
}));

export default useStyles;
