import { makeStyles } from 'tss-react/mui';
import { CylinderBg, CylinderRing } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  root: {
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 16,
    },
  },
  arrow: {
    background: 'none',
    '&:hover': {
      background: 'none',
    },
  },
  columns: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  day: {
    width: 120,
    margin: '0 18px',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: 80,
      transform: 'scale(.8)',
    },
  },
  cylinderBg: {
    width: 100,
    height: 370,
    background: `url(${CylinderBg}) no-repeat top center`,
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
  },
  liquid: {
    width: 76,
    flexGrow: 1,
    marginTop: -10,
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  },
  bottom: {
    width: 89,
    height: 53,
    marginTop: -18,
  },
  rings: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    padding: '57px 0 38px',
    marginLeft: 4,
  },
  ringsContainer: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  ring: {
    width: 98,
    height: 40,
    background: `url(${CylinderRing})`,
  },
  title: {
    fontWeight: 'bold',
    color: '#5126AD',
  },
  weekdays: {
    marginTop: 15,
  },
  video: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
}));

export default useStyles;
