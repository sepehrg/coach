import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  controls: {
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  button: {
    width: 96,
    height: 94,
    background: 'linear-gradient(39deg, #E4EFFA 25.86%, #B3CBE3 77.43%)',
    borderRadius: 20,
    borderBottom: '3px solid #B3CBE3',
    [theme.breakpoints.down('md')]: {
      width: 76,
      height: 72,
      '& img': {
        width: 42,
      },
    },
  },
  timer: {
    marginLeft: 20,
    height: 171,
    alignItems: 'center',
    background: 'linear-gradient(97.81deg, #B3CBE3 -19.42%, #E4EFFA 93.09%)',
    padding: '40px !important',
    borderBottomLeftRadius: 30,
    [theme.breakpoints.down('md')]: {
      padding: '35px 30px',
    },
  },
}));

export default useStyles;
