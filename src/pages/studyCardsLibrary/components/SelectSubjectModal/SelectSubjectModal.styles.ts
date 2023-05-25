import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    width: 536,
    height: 328,
    padding: 30,
  },
  backdrop: {
    opacity: '0.7 !important',
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  dialog: {
    borderRadius: 28,
  },
  title: {
    fontSize: 19,
    fontWeight: 500,
    paddingLeft: 6,
    fontFamily: 'system-ui',
    paddingTop: 10,
  },
  content: {
    justifyContent: 'space-between',
    padding: '20px 20px 0',
  },
  subject: {
    width: 210,
    height: 30,
    marginTop: 20,
  },
  ido: {
    width: 155,
    marginRight: 20,
  },
}));

export default useStyles;
