import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  datepicker: {
    opacity: '0.5',
    display: 'none',
  },
  dateItemBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    padding: '8px 15px',
    textAlign: 'center',
    // margin: '0 5px',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
  },
  monthBox: {
    minWidth: '100px',
  },
  fullWidth: {
    width: '100%',
  },
});

export default useStyles;
