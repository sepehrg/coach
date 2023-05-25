import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    width: 180,
  },
  subjectsContainer: {
    width: 160,
    overflow: 'auto',
    marginTop: 15,
  },
  button: {
    width: 150,
    margin: '0 0 10px -8px',
  },
  title: {
    margin: '0 0 20px 5px',
  },
  line: {
    height: 1,
    width: 76,
    background: 'rgba(0, 0, 0, 0.2)',
    marginLeft: 25,
  },
  subjectPlaceholder: {
    width: 120,
    height: 120,
    background: theme.palette.secondary.main,
    margin: '0 0 10px 8px',
    borderRadius: 10,
  },
  list: {
    '&:focus-visible': {
      outline: 'none',
    },
  },
}));

export default useStyles;
