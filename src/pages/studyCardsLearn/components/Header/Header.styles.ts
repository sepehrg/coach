import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  container: {
    padding: '17px 30px',
    borderBottom: '1px solid #CCCCCC',
  },
  settingsButton: {
    marginRight: 20,
  },
  subject: {
    lineHeight: '22px',
    fontFamily: 'Helvetica',
  },
  title: {
    fontFamily: 'Helvetica',
  },
  backButton: {
    padding: '10px 20px',
  },
});

export default useStyles;
