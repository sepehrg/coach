import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  outerContainer: {
    height: '75vh',
  },
  innerContainer: {
    marginBottom: 30,
    maxHeight: '20vh',
    position: 'relative',
  },
  searchBarWrapper: {
    marginTop: 16,
    marginBottom: 33,
  },
  helpBtn: {
    position: 'absolute',
    right: '-35%',
    top: 40,
    background: '#F2F5F7',
    height: 49,
    borderRadius: 15,
  },
});

export default useStyles;
