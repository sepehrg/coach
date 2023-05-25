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
    overflow: 'auto',
    background: 'linear-gradient(145.6deg, #E4EFFA 42.81%, #B3CBE3 106.22%)',
    borderRadius: '0px 41px 0px 0px',
    margin: '3px 5px 0 0',
    padding: '16px 31px',
    [theme.breakpoints.down('md')]: {
      width: 160,
    },
  },
  button: {
    padding: '4px 16px',
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
    marginBottom: 10,
    marginLeft: 8,
    borderRadius: 10,
  },
  list: {
    '&:focus-visible': {
      outline: 'none',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: -19,
    },
  },
  unsortedWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
}));

export default useStyles;
