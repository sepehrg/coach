import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  noteItem: {
    width: 362,
    padding: 10,
    marginBottom: 5,
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 12,
    color: '#545454',
    font: '400 16px Montserrat',
    justifyContent: 'left',
  },
  list: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 9,
    padding: '15px 10px',
  },
}));

export default useStyles;
