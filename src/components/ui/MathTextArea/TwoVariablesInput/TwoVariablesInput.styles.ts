import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  hidden: {
    display: 'none',
  },
  container: {
    borderRadius: 10,
    width: '75%',
    backgroundColor: theme.palette.common.white,
    margin: 10,
    position: 'absolute',
    bottom: 125,
    left: 10,
    padding: 5,
  },
  input: {
    width: 35,
    height: 22,
    margin: '0 15px 0 5px',
    borderRadius: 5,
    fontFamily: 'Montserrat',
    border: '1px solid rgba(0,0,0,0.2)',
    paddingLeft: 5,
    '&:active': {
      outline: 'none',
    },
    '&:hover': {
      outline: 'none',
    },
  },
  innerWrapper: {
    height: 25,
    padding: '0 0 0 10px',
  },
  button: {
    width: 30,
  },
  inline: {
    display: 'inline-block',
  },
}));

export default useStyles;
