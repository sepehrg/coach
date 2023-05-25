import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    maxWidth: 400,
    height: 326,
    textAlign: 'center',
    borderRadius: 10,
  },
  title: {
    paddingTop: 28,
  },
  closeButton: {
    marginBottom: 20,
    padding: '0 0 !important',
  },
  closeButtonText: {
    padding: '10px 50px',
  },
  dialog: {
    borderRadius: 28,
  },
});

export default useStyles;
