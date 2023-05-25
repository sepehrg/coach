import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  columns: {
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  photoItem: {
    marginTop: 250,
  },
  main: {
    width: 522,
    background: 'linear-gradient(90deg, #C7CDF1 2.01%, #BABFE7 98.29%)',
    borderRadius: 30,
    paddingBottom: 9,
    boxShadow: '0px 12px 13px rgb(0 0 0 / 10%)',
    [theme.breakpoints.down('md')]: {
      width: 460,
    },
  },
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    borderRadius: 30,
    width: '100%',
  },
  mainPhoto: {
    width: 396,
    [theme.breakpoints.down('md')]: {
      width: 320,
    },
  },
  changePassword: {
    marginBottom: 50,
    padding: '15px 25px',
  },
  mainProfile: {
    margin: '120px 100px 25px 0',
    [theme.breakpoints.down('md')]: {
      margin: '80px 0 25px 0',
    },
  },
  fieldTitle: {
    fontWeight: 600,
    fontSize: 16,
    color: '#390B52',
    marginBottom: 3,
    marginTop: 15,
  },
  field: {
    width: '100%',
  },
  languageBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  englishBox: {
    marginTop: 0,
  },
  languageCheckbox: {
    color: '#390B52 !important',
  },
  language: {
    color: '#545454',
    fontSize: 16,
  },

  titleBox: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #ADB4DC',
    padding: 20,
  },
  columnTitle: {
    marginBottom: 32,
  },
  fieldBox: {
    marginBottom: 36,
  },
  fullWidth: {
    width: '100%',
  },
  changePasswordText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 700,
  },
  blueArrow: {
    width: 35,
    height: 35,
  },
  signUpBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 30px',
  },
  signUpBotton: {
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    borderRadius: 90,
    fontWeight: 700,
    fontSize: 19,
    '&:disabled': {
      color: 'gray',
      opacity: 0.7,
    },
  },
}));

export default useStyles;
