import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  appointments: {
    font: '700 17px Montserrat',
    color: '#390B52',
    marginBottom: 5,
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
  },
  row: {
    padding: 3,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
      padding: 1,
    },
  },
  date: {
    font: '600 15px Montserrat',
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  title: {
    font: '500 15px Montserrat',
    marginLeft: 15,
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  column2: {
    flex: '1 1 0px',
    marginLeft: 20,
    borderLeft: '1px solid #CCC',
    paddingLeft: 20,
    height: 110,
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      height: 80,
    },
  },
}));

export default useStyles;
