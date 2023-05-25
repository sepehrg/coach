import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  dialog: {
    borderRadius: 28,
  },
  backdrop: {
    opacity: '0.7 !important',
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  root: {
    width: 400,
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#E9ECFB',
  },
  close: {
    position: 'absolute',
    right: 13,
    top: 10,
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0 30px',
    alignItems: 'center',
  },
  header: {
    font: '500 32px Montserrat',
    color: '#545454',
    padding: '10px 0',
  },
  label: {
    font: '600 14px Montserrat',
    color: '#0B2352',
    marginTop: 15,
  },
  timeItem: {
    flexGrow: 1,
    marginRight: 10,
  },
  fullWidth: {
    width: '100%',
    margin: '7.5px 0px',
    cursor: 'pointer',
  },
  textField: {
    backgroundColor: '#F5F8FF',
  },
  formField: {
    margin: '7.5px 0px',
  },
  frequency: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#F5F8FF',
    width: '100%',
  },
  editBtn: {
    marginLeft: 15,
    background: 'linear-gradient(0deg, #A32561 -3.08%, #D9257C 24.94%, #D9247B 61.11%)',
    color: '#ffffff',
  },
});

export default useStyles;
