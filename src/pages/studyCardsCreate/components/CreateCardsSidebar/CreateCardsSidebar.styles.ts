import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  menu: {
    height: 174,
    [theme.breakpoints.down('md')]: {
      height: 141,
    },
  },
  subjectsContainerWrapper: {
    background: 'linear-gradient(90deg, #C7CDF1 2.01%, #BABFE7 98.29%)',
    borderRadius: '0px 47px 0px 0px',
  },
  subjectsContainer: {
    width: 200,
    background: 'linear-gradient(145.6deg, #E4EFFA 42.81%, #B3CBE3 106.22%)',
    borderRadius: '0px 41px 0px 0px',
    margin: '3px 5px 0 0',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: 160,
    },
  },
  button: {
    width: 150,
    margin: '0 0 10px -8px',
  },
  title: {
    margin: '0 0 15px 5px',
  },
  line: {
    height: 1,
    width: 76,
    background: 'rgba(0, 0, 0, 0.2)',
    marginLeft: 25,
  },
  sidebarCard: {
    width: 145,
    minHeight: 83,
    maxHeight: 83,
    borderRadius: 10,
    position: 'relative',
    background: theme.palette.secondary.main,
    margin: '0px 0 15px',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.15)',
    },
  },
  sidebarCardActive: {
    background: 'rgba(0, 0, 0, 0.15)',
    border: 'none',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.15)',
    },
  },
  addCardItem: {
    marginTop: 20,
  },
  addCardBtn: {
    width: 120,
    height: 120,
    minHeight: 120,
    marginBottom: 20,
    borderRadius: 30,
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    boxShadow: '0px 4px 7px 1px rgb(97 108 181 / 30%)',
    fontFamily: 'Helvetica',
    fontWeight: 400,
  },
  addIcon: {
    width: 38,
    height: 38,
  },
  label: {
    flexDirection: 'column',
  },
  cardText: {
    width: 125,
    margin: '0 10px',
    fontFamily: 'Montserrat',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: '14px',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    background: 'none',
  },
  cardsWrapper: {
    overflow: 'auto',
    height: 480,
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
}));

export default useStyles;
