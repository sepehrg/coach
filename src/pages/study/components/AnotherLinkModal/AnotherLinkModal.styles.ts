import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    height: 456,
    width: 510,
  },
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  marginTop: {
    marginTop: 24,
  },
  buttonsContainer: {
    justifyContent: 'center',
  },
  submitButtonText: {
    padding: '0 16px',
    color: theme.palette.common.white,
  },
  closeButton: {
    marginRight: 16,
  },
  backdrop: {
    opacity: '0.7 !important',
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  dialog: {
    borderRadius: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    paddingLeft: 6,
    fontFamily: 'Futura',
  },
  field: {
    width: '47%',
  },
  urlInput: {
    width: 225,
  },
  description: {
    position: 'relative',
    width: 446,
    height: 91,
    padding: '25px 14px 16px',
    borderRadius: 7,
    marginTop: 20,
    background: 'linear-gradient(113.19deg, #E4EFFA 9.75%, #B3CBE3 94.03%)',
  },
  next: {
    position: 'absolute',
    width: 153,
    top: -15,
    padding: '4px 0px 2px 7px',
    borderRadius: '0px 0px 3px 3px',
    color: theme.palette.common.white,
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  triangle: {
    position: 'absolute',
    width: '0',
    height: '0',
    top: -14,
    left: 165,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderRight: '10px solid #551975',
    transform: 'rotate(-45deg)',
  },
  submit: {
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    borderRadius: 90,
    padding: '20px 30px',
    lineHeight: 1,
    fontWeight: 600,
    color: '#FFFFFF',
    '&:disabled': {
      color: 'gray',
      opacity: 0.7,
    },
  },
}));

export default useStyles;
