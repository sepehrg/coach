import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  dialog: {
    minWidth: 200,
    minHeight: 100,
    borderRadius: 28,
    backgroundColor: '#E9ECFB',
  },
  backdrop: {
    opacity: '0.7 !important',
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  root: {
    padding: '40px 10px 20px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  task: {
    marginBottom: 20,
  },
  arrow: {
    marginTop: 35,
  },
  close: {
    position: 'absolute',
    right: 13,
    top: 10,
  },
  trashcan: {
    width: 30,
    minWidth: 30,
    background: 'rgba(220, 54, 134, 0.24)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.14) !important',
    borderRadius: 12,
  },
  ido: {
    padding: '0 5px',
  },
  idoButton: {
    background: 'none',
    width: 87,
    [theme.breakpoints.down('md')]: {
      width: 75,
      padding: 0,
    },
  },
  activity: {
    width: 85,
    height: 72,
    margin: '0 5px',
    background: '#F5F8FF',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 12,
    font: '400 16px Montserrat',
    color: '#545454',
    [theme.breakpoints.down('md')]: {
      padding: 0,
      width: 73,
      height: 62,
      fontSize: 14,
      '& img': {
        width: '70%',
      },
    },
  },
  header: {
    font: '500 12px Montserrat',
    color: '#545454',
    padding: '10px 0',
  },
  sectionsSpace: {
    marginTop: 27,
  },
}));

export default useStyles;
