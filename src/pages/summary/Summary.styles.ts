import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  pageContainer: {
    flexDirection: 'column',
  },
  summaryTitle: {
    fontSize: 26,
    marginBottom: 35,
    fontWeight: 600,
  },
  ratesContainer: {
    margin: '32px 40px',
  },
  focusState: {
    color: 'gray',
    fontSize: 13,
  },
  rateBox: {
    borderRadius: 10,
    width: 63,
    height: 63,
    cursor: 'pointer',
  },
  rateImg: {},
  textField: {
    width: '100%',
    padding: '12px 0',
    marginLeft: 45,
  },
  textArea: {
    height: 147,
    boxShadow: 'none',
    '& textarea': {
      height: '85%',
    },
  },
  numberItem: {
    minWidth: 29,
    maxWidth: 29,
    height: 29,
    background: '#e1f0f9',
    borderRadius: 15,
    marginRight: 15,
  },
  columns: {
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  left: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 160,
    paddingTop: 20,
  },
  leftText: {
    textAlign: 'center',
  },
  rightWrapper: {
    background: 'linear-gradient(90deg, #C7CDF1 2.01%, #BABFE7 98.29%)',
    borderRadius: 30,
    paddingBottom: 9,
    marginBottom: 30,
    boxShadow: '0px 12px 13px rgb(0 0 0 / 10%)',
  },
  right: {
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    borderRadius: 30,
    width: 585,
    padding: '40px 30px',
  },

  image: {
    marginTop: 70,
    [theme.breakpoints.down('md')]: {
      width: 370,
    },
  },
  minutes: {
    fontWeight: 600,
    fontSize: 21,
    color: '#390B52',
    marginTop: 10,
  },
  studyTime: {
    fontSize: 72,
    lineHeight: '60px',
    fontWeight: 700,
    color: '#390B52',
  },
  goalText: {},
  label: {
    fontSize: 16,
    color: '#000000',
  },
  completeButton: {
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    padding: '20px 30px',
    lineHeight: 1,
    fontSize: 19,
    '&:disabled': {
      color: 'gray',
      opacity: 0.7,
    },
  },
}));
export default useStyles;
