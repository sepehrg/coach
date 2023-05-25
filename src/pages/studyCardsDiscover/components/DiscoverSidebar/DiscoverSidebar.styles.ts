import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    flexDirection: 'column',
    alignItems: 'start',
  },
  subjectsContainerWrapper: {
    background: 'linear-gradient(90deg, #C7CDF1 2.01%, #BABFE7 98.29%)',
    borderRadius: '0px 47px 0px 0px',
  },
  subjectsContainer: {
    width: 200,
    height: 519,
    overflow: 'auto',
    background: 'linear-gradient(145.6deg, #E4EFFA 42.81%, #B3CBE3 106.22%)',
    borderRadius: '0px 41px 0px 0px',
    margin: '3px 5px 0 0',
    padding: '15px 32px',
    [theme.breakpoints.down('md')]: {
      width: 160,
      padding: 12,
    },
  },
  list: {
    overflow: 'visible',
    '&:focus-visible': {
      outline: 'none',
    },
  },
  button: {
    width: 150,
    margin: '0 0 10px -8px',
  },
  title: {
    margin: '0 0 20px 5px',
  },
  line: {
    height: 1,
    width: 76,
    background: 'rgba(0, 0, 0, 0.2)',
    marginLeft: 25,
  },
  subjectPlaceholder: {
    width: 120,
    height: 120,
    background: theme.palette.secondary.main,
    margin: '0 0 10px 8px',
    borderRadius: 10,
  },
  buttonBlue: {
    height: 120,
    width: 120,
    fontWeight: 600,
    fontSize: 12,
    margin: '0 0 20px 0',
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  buttonLabel: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    lineHeight: 1.2,
    marginTop: 10,
  },
  backButtonWrapper: {
    width: 135,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: 3,
      width: 123,
    },
  },
  backButton: {
    width: '100%',
    padding: '4px 16px',
    marginTop: 1,
    marginBottom: 30,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
}));

export default useStyles;
