import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    width: 510,
  },
  container: {
    flexDirection: 'column',
    padding: 30,
  },
  row: {
    padding: '5px 0',
  },
  subjects: {
    width: '99%',
  },
  title: {
    font: '700 20px Helvetica',
    marginBottom: 10,
  },
  backdrop: {
    opacity: '0.7 !important',
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  dialog: {
    borderRadius: 28,
  },
  search: {
    gap: '5px',
  },
  date: {
    gap: '5px',
    flexWrap: 'nowrap',
  },
  dateItem: {
    width: '100%',
  },
}));

export default useStyles;
