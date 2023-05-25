import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  greeting: {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '44px',
  },
  greetingWrapper: {
    marginBottom: 60,
  },
  infoButton: {
    marginLeft: 10,
  },
});

export default useStyles;
