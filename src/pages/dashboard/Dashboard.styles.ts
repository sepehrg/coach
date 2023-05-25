import { makeStyles } from 'tss-react/mui';
import { DashboardBottom, DashboardRepeat, DashboardTop, QuickAccessBg } from 'assets/images';

const useStyles = makeStyles()((theme: any) => ({
  dashboard: {
    background: `url(${DashboardTop}) no-repeat top`,
    width: 1142,
    height: 844,
    marginTop: -236,
    marginLeft: 8,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: 911,
      height: 665,
      backgroundSize: 911,
      marginTop: -268,
    },
  },
  outer: {
    backgroundImage: `url(${DashboardBottom}), url(${DashboardRepeat})`,
    backgroundRepeat: 'no-repeat, repeat-y',
    backgroundPosition: 'bottom',
    width: '100%',
    marginTop: 650,
    [theme.breakpoints.down('md')]: {
      backgroundSize: 911,
      marginTop: 556,
    },
  },
  inner: {
    marginTop: -650,
    padding: 25,
    [theme.breakpoints.down('md')]: {
      marginTop: -558,
    },
  },
  dashboardContent: {
    flexDirection: 'column',
    rowGap: '40px',
    [theme.breakpoints.down('md')]: {
      rowGap: '0',
    },
  },
  header: {
    width: '86%',
    justifyContent: 'space-between',
    marginTop: 25,
    [theme.breakpoints.down('md')]: {
      width: '83%',
      height: 30,
      marginTop: 8,
    },
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 22,
    fontWeight: 700,
    color: '#454444',
  },
  switch: {
    transform: 'scale(1.50)',
    background: '#e6e9f9',
    width: 52,
    outlineColor: '#ffffff',
    outlineWidth: 1.5,
    outlineStyle: 'solid',
  },
  switchIcon: {
    height: 20,
  },
  progressBar: {
    width: 944,
    marginLeft: 40,
    [theme.breakpoints.down('md')]: {
      width: 763,
      marginTop: 50,
    },
  },
  quickAccess: {
    width: 216,
    marginTop: -72,
    background: `url(${QuickAccessBg}) no-repeat right`,
    backgroundSize: 239,
    [theme.breakpoints.down('md')]: {
      width: 161,
      marginTop: -147,
      backgroundSize: 191,
    },
  },
  links: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 30,
    justifyContent: 'space-around',
    height: 621,
    marginTop: 31,
    [theme.breakpoints.down('md')]: {
      height: 502,
      marginLeft: 20,
    },
  },

  button: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    height: 83,
    fontSize: '1Srem',
    padding: '10px 30px 10px 20px',
  },
  clock: {
    width: '140%',
  },
  classmatesWrapper: {
    paddingRight: 16,
  },
  studyProgressWrapper: {
    paddingRight: 16,
  },
  studyProgress: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    paddingBottom: 5,
  },
  topContainer: {
    margin: '20px 0 16px',
  },
  ido: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 2,
  },
}));

export default useStyles;
