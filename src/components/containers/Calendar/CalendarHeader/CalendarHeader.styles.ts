import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    marginBottom: 22,
  },
  arrowImg: {
    width: 24,
    height: 24,
    padding: 10,
  },
  button: {
    background: '#F2F5F7',
    borderRadius: 10,
    '&:hover': {
      background: '#DCE2E6',
    },
  },
  monthInfoBox: {
    padding: '10px 16px',
    background: '#F2F5F7',
    borderRadius: 10,
  },
  monthBox: {
    width: 118,
    height: 44,
    background: '#F2F5F7',
    padding: '10px 0px',
    borderRadius: 10,
    textAlign: 'center',
  },
  yearBox: {
    width: 72,
    height: 44,
    background: '#F2F5F7',
    borderRadius: 10,
    padding: '10px 0px',
    textAlign: 'center',
  },
  dayBox: {
    width: 68,
    height: 44,
    textAlign: 'center',
    padding: '10px 0px',
    background: '#F2F5F7',
    borderRadius: 10,
  },
});

export default useStyles;
