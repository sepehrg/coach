import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    margin: '17px 30px 0 10px',
    [theme.breakpoints.down('md')]: {
      margin: '17px 2px 0 5px',
    },
  },
  title: {
    padding: '40px 40px 25px',
    borderBottom: '1px solid #CCCCCC',
  },
  header: {
    font: '400 26px Helvetica',
    [theme.breakpoints.down('md')]: {
      font: '400 22px Helvetica',
    },
  },
  container: {
    height: '75vh',
    overflowY: 'auto',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 35,
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(0, 0, 0, 0.2)',
    },
    '&::-webkit-scrollbar-thumb': {
      boxShadow: 'inset 0 0 6px rgb(255, 52, 133,1)',
      webkitBoxShadow: 'inset 0 0 6px rgb(255, 52, 133,1)',
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 20,
    },
  },
  cardsContainer: {
    padding: 10,
  },
  cards: {
    width: 535,
    marginRight: 30,
    borderRadius: 30,
    background: 'linear-gradient(105.36deg, #F9F9F9 6.32%, #F9FAFF 80.44%)',
    [theme.breakpoints.down('md')]: {
      width: 438,
    },
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    minHeight: 200,
    overflowY: 'scroll',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    padding: 15,
    [theme.breakpoints.down('md')]: {
      minHeight: 163,
    },
  },
  separator: {
    width: '100%',
    height: 1,
    background: '#ccc',
  },
  panel: {
    width: 430,
    background: 'linear-gradient(105.36deg, #F9F9F9 6.32%, #F9FAFF 80.44%)',
    borderRadius: 30,
    [theme.breakpoints.down('md')]: {
      width: 336,
    },
  },
  nativeInput: {
    borderBottom: 'none',
  },
  select: {
    paddingTop: 10,
  },
  selectMenu: {
    marginLeft: '-10px',
    minWidth: '170px!important',
    maxWidth: '170px!important',
    marginTop: 25,
  },
  label: {
    paddingLeft: 20,
    paddingTop: 8,
    fontSize: 12,
    color: theme.palette.secondary.dark,
    fontFamily: 'Montserrat',
  },
  focusedLabel: {
    paddingTop: 0,
    color: theme.palette.primary.main,
  },
  shrinkLabel: {
    paddingTop: 0,
    color: theme.palette.secondary.dark,
  },
  saveButton: {
    width: 150,
    marginLeft: 10,
  },
  emptyContainer: {
    height: '100%',
    width: '100%',
  },
  emptyImage: {
    width: '68%',
  },
}));

export default useStyles;
