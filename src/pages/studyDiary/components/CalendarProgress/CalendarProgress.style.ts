import { makeStyles } from 'tss-react/mui';
import { CylinderBgCalendar, Liquid, SilverBottom, SilverTop } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  calendarProgress: {
    margin: '100px 0 0 80px',
    [theme.breakpoints.down('md')]: {
      margin: '76px 0 0 40px',
    },
  },
  cylinderItem: {
    height: 400,
    [theme.breakpoints.down('md')]: {
      height: 350,
    },
  },
  cylinderBg: {
    width: 100,
    height: 370,
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
  },
  cylinder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  top: {
    width: 89,
    height: 58,
    zIndex: 1,
    position: 'absolute',
    marginTop: -4,
    background: `url(${SilverTop}) no-repeat top center`,
  },
  glass: {
    alignItems: 'end',
    marginTop: 42,
    flexGrow: 1,
    background: `url(${CylinderBgCalendar}) no-repeat top center`,
  },
  liquid: {
    width: 76,
    marginLeft: 6,
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    background: `url(${Liquid}) no-repeat top center`,
  },
  bottom: {
    width: 89,
    height: 53,
    marginTop: -18,
    background: `url(${SilverBottom}) no-repeat top center`,
  },
}));

export default useStyles;
