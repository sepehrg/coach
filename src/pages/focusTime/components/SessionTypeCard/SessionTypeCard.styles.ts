import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    background: '#F2F5F7',
    padding: '20px 16px',
    height: 260,
    width: 252,
    borderRadius: '10px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.15)',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
    },
  },
  cardImage: {
    width: 160,
    marginTop: 30,
  },
  cardText: {
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 600,
    textAlign: 'center',
  },
});

export default useStyles;
