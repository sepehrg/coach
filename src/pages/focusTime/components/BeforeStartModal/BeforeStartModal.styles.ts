import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  marginBottom: {
    marginBottom: 15,
  },
  buttonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default useStyles;
