import { makeStyles } from 'tss-react/mui';
import { MenuBg } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  logoImg: {
    height: 161,
    marginTop: 10,
    [theme.breakpoints.down('md')]: {
      height: 128,
    },
  },
  logoImgSmall: {
    height: 102,
    marginTop: 10,
    [theme.breakpoints.down('md')]: {
      height: 85,
    },
  },
  navContainer: {
    pointerEvents: 'none',
    '& .bg': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      visibility: 'hidden',
      opacity: 0,
      transition: '.3s',
      background: '#000',
    },
    '&:focus-within .bg': {
      visibility: 'visible',
      opacity: 0,
    },
    '&:focus-within .button': {
      pointerEvents: 'none',
    },
    '&:focus-within .navContent': {
      transform: 'none',
    },
    '& *': {
      visibility: 'visible',
    },
  },
  button: {
    width: 150,
    cursor: 'pointer',
    pointerEvents: 'auto',
    [theme.breakpoints.down('md')]: {
      width: 128,
    },
  },
  navContent: {
    width: 220,
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100vh',
    pointerEvents: 'auto',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    transform: 'translateX(-100%)',
    transition: 'transform .3s',
    willChange: 'transform',
    contain: 'paint',
    zIndex: 1,
    background: `url(${MenuBg}) no-repeat top left / 100% 100vh`,
    [theme.breakpoints.down('md')]: {
      width: 190,
    },
  },
  menu: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 166,
    flexWrap: 'nowrap',
    [theme.breakpoints.down('md')]: {
      width: 142,
    },
  },
  topItem: {
    height: '100%',
  },
  top: {
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    height: '90%',
  },
  pages: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56%',
    marginBottom: 40,
    [theme.breakpoints.down('md')]: {
      marginTop: 30,
    },
  },
  avatar: {
    width: '72px !important',
    height: '72px !important',
    border: 6,
    marginBottom: 50,
    [theme.breakpoints.down('md')]: {
      width: 60,
      height: 60,
      marginBottom: 20,
    },
  },
  logoMenu: {
    marginBottom: 15,
    [theme.breakpoints.down('md')]: {
      '& > img': {
        width: 85,
      },
    },
  },
  linkButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: 15,
    [theme.breakpoints.down('md')]: {
      '& img': {
        width: 36,
      },
    },
  },
  link: {
    opacity: 0.7,
    [theme.breakpoints.down('md')]: {
      '& svg': {
        width: 45,
      },
    },
  },
  setting: {
    opacity: 0.7,
  },
  active: {
    position: 'relative',
    opacity: 1,
    '& .activeMenuHighlight': {
      position: 'absolute',
      width: 63,
      height: 4,
      left: -6,
      [theme.breakpoints.down('md')]: {
        left: -10,
        top: 12,
      },
      background:
        'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.61) 0%, rgba(63, 172, 255, 0.26) 100%)',
      filter: 'blur(2px)',
    },
  },
}));

export default useStyles;
