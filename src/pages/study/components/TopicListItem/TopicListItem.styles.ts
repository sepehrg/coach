import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    background: '#F2F5F7',
    borderRadius: '10px',
    margin: '6px 0',
    width: '99%',
    height: 47,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      background: 'rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease-in-out',
    },
  },
  text: {
    paddingLeft: 10,
    paddingTop: 12,
  },
});

export default useStyles;
