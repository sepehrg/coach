import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginBottom: 50,
    [theme.breakpoints.down('md')]: {
      marginBottom: 35,
    },
  },
  headerContainer: {
    justifyContent: 'space-between',
    borderBottom: '1px solid #ADB4DC',
    padding: 20,
    marginBottom: 20,
    [theme.breakpoints.down('md')]: {
      padding: '10px 20px',
      marginBottom: 10,
    },
  },
  title: {
    '& p': {
      color: '#454444',
      fontSize: 22,
      fontWeight: 700,
      [theme.breakpoints.down('md')]: {
        fontSize: 19,
      },
    },
  },
  totalTime: {
    '& p': {
      color: '#454444',
      fontSize: 22,
      fontWeight: 500,
    },
  },
  content: {
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  barChart: {
    width: '70%',
  },
  inner: {
    flexWrap: 'nowrap',
  },
  chartItem: {
    width: '88%',
  },
  averageItem: {
    paddingBottom: 25,
    width: 118,
  },
  averageContainer: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  average: {
    position: 'absolute',
    fontWeight: 500,
    fontSize: 16,
    color: '#857D7D',
  },
  details: {
    width: 290,
    [theme.breakpoints.down('md')]: {
      width: 243,
    },
  },
  studyTile: {
    height: 92,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    boxShadow: '0px 14px 44px rgba(170, 188, 206, 0.5)',
    margin: 6,
    [theme.breakpoints.down('md')]: {
      height: 80,
    },
  },
  studyTileContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  time: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      color: '#857D7D',
      font: '500 16px Montserrat',
    },
  },
  topic: {
    padding: 3,
  },
  topicContainer: {
    alignItems: 'center',
  },
  color: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginLeft: 10,
  },
  topicTitle: {
    marginLeft: 10,
    '& p': {
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
  },
}));

export default useStyles;
