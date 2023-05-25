import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  main: {
    width: 522,
    background: 'linear-gradient(90deg, #C7CDF1 2.01%, #BABFE7 98.29%)',
    borderRadius: 30,
    paddingBottom: 9,
    margin: '-160px auto 18px',
    boxShadow: '0px 12px 13px rgb(0 0 0 / 10%)',
  },
  root: {
    flexDirection: 'column',
    // alignItems: 'center',
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    borderRadius: 30,
    width: 522,
  },
  titleBox: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #ADB4DC',
    padding: 20,
  },
  label: {
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
  languageCheckbox: {
    color: '#390B52 !important',
  },
  language: {
    color: '#545454',
    fontSize: 16,
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
    width: 188,
    height: 53,
    fontWeight: 700,
    fontSize: 19,
  },
});

export default useStyles;
