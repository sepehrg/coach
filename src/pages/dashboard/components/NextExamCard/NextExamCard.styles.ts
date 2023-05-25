import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    background: theme.palette.secondary.main,
    borderRadius: 10,
    padding: '20px 16px 10px',
    maxHeight: 463,
  },
  subjectImg: {
    maxHeight: 93,
  },
  examCard: {
    background: theme.palette.common.white,
    borderRadius: '10px',
    margin: '16px 0',
    height: 290,
  },
  subject: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '24px',
    // marginBottom: 30,
  },
  title: {
    fontSize: 12,
    fontWeight: 500,
    // marginBottom: 80,
  },
  daysCount: {
    fontWeight: 700,
    fontSize: 24,
  },
  button: {
    width: '100%',
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.1)',
    fontSize: 13,
    fontWeight: 600,
  },
  noExamsText: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  noExamsImg: {
    marginTop: 36,
  },
}));

export default useStyles;
