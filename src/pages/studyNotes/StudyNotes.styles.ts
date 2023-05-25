import { makeStyles } from 'tss-react/mui';
import { NotebookBg, NotebookSideBg } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  container: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  header: {
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {},
  },
  notebook: {
    position: 'relative',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: '50px 100px',
    background: `url(${NotebookBg}) no-repeat top`,
    width: 1289,
    height: 1003,
    [theme.breakpoints.down('md')]: {
      width: 1014,
      height: 788,
      backgroundSize: 1009,
      padding: '35px 85px',
    },
  },
  pageHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subject: {
    width: 72,
  },
  selectWrapper: {
    minWidth: '100px!important',
  },
  titleItem: {},
  title: {
    font: '600 40px Montserrat',
    color: '#0B2352',
    width: 781,
    [theme.breakpoints.down('md')]: {
      font: '600 29px Montserrat',
      width: 570,
    },
  },
  dateItem: {
    width: 90,
    justifyContent: 'end',
  },
  date: {
    width: 90,
    flexDirection: 'column',
    alignItems: 'center',
  },
  favorite: {
    cursor: 'pointer',
  },
  studyCardItem: {
    position: 'absolute',
    bottom: 80,
    right: 105,
  },
  studyCardButton: {
    background: 'none',
    padding: 0,
  },
  sidebar: {
    background: `url(${NotebookSideBg}) no-repeat top left`,
    width: 77,
    height: 1000,
    [theme.breakpoints.down('md')]: {
      width: 64,
      height: 787,
      backgroundSize: 68,
    },
  },
}));

export default useStyles;
