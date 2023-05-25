import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    maxWidth: 400,
    padding: '20px 24px',
  },
  titleBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paragraph: {
    maxWidth: 350,
    marginTop: 20,
  },
  iconBox: {
    width: '100%',
    textAlign: 'center',
    margin: '15px 0',
  },
});

export default useStyles;
