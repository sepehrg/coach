import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    width: 400,
    padding: '18px 24px',
    borderRadius: '10px',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 136,
    height: 48,
    borderRadius: '10px',
    marginTop: 24,
  },
  noteText: {
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: 11,
    lineHeight: '24px',
  },
  hintNumber: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.body1.fontWeight,
    fontSize: theme.typography.body1.fontSize,
    width: 22,
    height: 22,
    borderRadius: 50,
    background: '#F2F5F7',
    marginRight: 20,
  },
  hintWrapper: {
    margin: '12px 0',
  },
  hintsContainer: {
    marginTop: 15,
    marginBottom: 36,
  },
}));

export default useStyles;
