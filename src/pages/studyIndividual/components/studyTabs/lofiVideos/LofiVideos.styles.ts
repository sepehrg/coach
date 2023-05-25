import { makeStyles } from 'tss-react/mui';
import { VideoBg } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  container: {
    maxHeight: 'calc(100vh - 250px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(0, 0, 0, 0.2)',
    },
    '&::-webkit-scrollbar-thumb': {
      boxShadow: 'inset 0 0 6px rgb(255, 52, 133,1)',
      webkitBoxShadow: 'inset 0 0 6px rgb(255, 52, 133,1)',
    },
  },
  videoItem: {
    width: 498,
    height: 317,
    paddingLeft: 13,
    background: `url(${VideoBg}) no-repeat`,
    [theme.breakpoints.down('md')]: {
      width: 395,
      height: 248,
      backgroundSize: 390,
    },
  },
  link: {
    width: 470,
    height: 274,
    overflow: 'hidden',
    borderRadius: 30,
    [theme.breakpoints.down('md')]: {
      width: 365,
      height: 214,
      borderRadius: 22,
    },
  },
  preview: {
    width: '100%',
    marginTop: -53,
    transform: 'scale(1.2) translate(0, 5%)',
  },
}));

export default useStyles;
