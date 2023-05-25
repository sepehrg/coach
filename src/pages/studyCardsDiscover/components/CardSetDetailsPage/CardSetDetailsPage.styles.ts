import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  content: {
    margin: '0 11px 30px',
  },
  main: {
    flexDirection: 'column',
    background: '#F5F8FF',
    borderRadius: 30,
  },
  headerContainer: {
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  header: {
    height: 100,
    padding: '0 35px',
  },
  title: {
    fontWeight: 600,
  },
  subject: {
    color: '#B3B4BD',
  },
  footerItem: {
    padding: '0 10px',
  },
  footer: {
    height: 80,
    padding: '20px 40px 20px 35px',
    borderRadius: '30px 30px 0px 0px',
    backgroundColor: '#F5F8FF',
    justifyContent: 'space-between',
  },
  closeButton: {
    whiteSpace: 'nowrap',
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    borderRadius: 90,
    padding: '12px 30px',
    lineHeight: 1,
    minWidth: 144,
  },
  picture: {
    width: 44,
    height: 44,
    marginRight: 10,
  },
  created: {
    color: '#B3B4BD',
  },
  creator: {
    fontSize: 21,
    color: '#390B52',
    fontWeight: 400,
  },
  footerIcons: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  number: {
    fontSize: 19,
  },
  divider: {
    width: 1,
    background: 'rgba(0, 0, 0, 0.1)',
    height: 38,
    margin: '0 28px 0 10px',
  },
  card: {
    background: theme.palette.secondary.main,
    width: 605,
    minHeight: 235,
    maxHeight: 235,
    overflowY: 'scroll',
    margin: '0px 0 9px',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    padding: 15,
    [theme.breakpoints.down('md')]: {
      width: 488,
      minHeight: 188,
      maxHeight: 188,
    },
  },
  leftCard: {
    borderRight: '1px solid gray',
  },
  cardsWrapperItem: {
    margin: 20,
  },
  cardsWrapper: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 200px)',
    minHeight: 'calc(100vh - 200px)',
    padding: '0 18px',
  },
  cardsWrapperCopyMode: {
    paddingLeft: 30,
  },
  cardRow: {
    // height: 'min-content',
  },
  sidebar: {
    background: theme.palette.secondary.main,
    borderRadius: 10,
    padding: '5px',
    width: 120,
    margin: '40px 20px',
  },
  menuButton: {
    height: 90,
    width: 85,
    background: theme.palette.common.white,
    fontWeight: 600,
    fontSize: 12,
    margin: 8,
  },
  menuLabel: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default useStyles;
