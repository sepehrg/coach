import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {},
  subjectBox: {
    padding: '5px 10px',
    boxSizing: 'border-box',
    border: '1px solid #B3B4BD',
    borderRadius: 5,
    margin: '2px 4px',
    cursor: 'pointer',
    '&:hover': {
      cursor: 'pointer',
      background: '#F2F5F7',
    },
  },
  subjectBoxActive: {
    background: '#F2F5F7',
    border: 'none',
  },
});

export default useStyles;
