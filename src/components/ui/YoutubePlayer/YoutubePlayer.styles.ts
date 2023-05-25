import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  youtubePlayer: {
    position: 'fixed',
    zIndex: 1,
    bottom: 40,
    right: 40,
    background: 'black',
  },
  iframe: {
    width: '100%',
    height: 170,
  },
  close: {
    position: 'absolute',
    top: -22,
    right: 0,
    color: '#FFFFFF',
    cursor: 'pointer',
    background: 'black',
    padding: '0 5px',
    borderRadius: '0 5px 0 0',
    fontSize: 18,
    minWidth: 15,
    height: 22,
    '&:hover': {
      background: 'black',
    },
  },
  handle: {
    position: 'absolute',
    top: -22,
    right: 19,
    color: '#FFFFFF',
    cursor: 'pointer',
    backgroundColor: 'black',
    padding: '0 5px',
    borderRadius: '5px 0 0 0',
  },
});

export default useStyles;
