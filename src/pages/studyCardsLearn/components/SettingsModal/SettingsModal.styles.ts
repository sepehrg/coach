import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: '15px 25px',
    width: 400,
    height: 200,
  },
  content: {
    paddingTop: 30,
  },
  buttonsWrapper: {
    marginTop: 30,
  },
  option: {
    width: 70,
    height: 44,
    borderRadius: 10,
    backgroundColor: theme.palette.secondary.main,
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 5px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  chosenOption: {
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': { backgroundColor: theme.palette.secondary.dark },
  },
}));

export default useStyles;
