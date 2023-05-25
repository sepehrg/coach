import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  pageWrapper: {
    height: '78vh',
  },
  materialsWrapper: {
    width: '90vw',
  },
  button: {
    marginTop: 20,
    backgroundColor: theme.palette.secondary.main,
  },
  finishButton: {
    marginTop: 20,
    backgroundColor: theme.palette.secondary.main,
    height: 44,
  },
  arrowButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    minWidth: 30,
    maxWidth: 30,
    height: 60,
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
    background: theme.palette.secondary.dark,
  },
}));

export default useStyles;
