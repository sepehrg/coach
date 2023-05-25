import { CylinderHorizontal, CylinderHorizontalLeft, CylinderLiquid } from 'assets/images';
import { makeStyles } from 'tss-react/mui';
import { StyleProps } from '.';

const useStyles = makeStyles<StyleProps>()((theme: any, props) => ({
  cylinderContainer: {
    '&:hover': {
      '& .time': {
        display: 'block',
      },
    },
  },
  left: {
    width: 53,
    height: 89,
    background: `url(${CylinderHorizontalLeft})`,
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
      backgroundSize: 40,
      width: 39,
      height: 67,
    },
  },
  right: {
    width: 58,
    height: 89,
    background: `url(${CylinderHorizontal})`,
    marginLeft: -4,
    zIndex: 1,
    [theme.breakpoints.down('md')]: {
      backgroundSize: 43,
      width: 39,
      height: 67,
    },
  },
  cylinder: {
    width: 200,
    height: 73,
    margin: '8px 0 0 -16px',
    background:
      'linear-gradient(270deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.29) 50.52%, rgba(255, 255, 255, 0.65) 100%)',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      backgroundSize: 160,
      width: 160,
      height: 54,
      margin: '7px 0 0 -11px',
    },
  },
  shadow: {
    boxShadow: '-2px 0px 8px 6px #e8ecf0',
  },
  liquid: {
    background: `url(${CylinderLiquid}) no-repeat right`,
    height: '100%',
    width: ((props.duration - props.remaining) / props.duration) * 100 + 10 + '%',
    maxWidth: '110%',
  },
  time: {
    display: 'none',
    position: 'absolute',
    bottom: -35,
    left: 48,
    width: 120,
    height: 35,
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    borderRadius: '0px 0px 10px 10px',
    fontSize: 17,
    fontWeight: 600,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 3,
    [theme.breakpoints.down('md')]: {
      width: 100,
      height: 30,
      fontSize: 15,
      bottom: -31,
      left: 35,
    },
  },
}));

export default useStyles;
