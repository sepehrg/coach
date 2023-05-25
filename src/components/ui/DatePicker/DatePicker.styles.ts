import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  datepicker: {
    opacity: '0.5',
    display: 'none',
  },
  dateItemBox: {
    backgroundColor: '#F2F5F7',
    borderRadius: '10px',
    padding: '12px 0px',
    textAlign: 'center',
    // margin: '0 5px',
    cursor: 'pointer',
  },
  monthBox: {
    // width: '160px',
  },
  fullWidth: {
    width: '100%',
  },
});

export default useStyles;
