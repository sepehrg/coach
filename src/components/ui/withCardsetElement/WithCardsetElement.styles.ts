import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    margin: '0px 0 20px',
    padding: '20px 24px',
    transition: 'background',
    transitionDuration: '.5s',
    justifyContent: 'space-between',
  },
  clickable: {
    '&:hover': {
      backgroundColor: '#FFFFFF',
      cursor: 'pointer',
    },
  },
  title: {
    fontSize: 25,
    fontWeight: 700,
  },
  tag: {
    fontSize: 12,
    fontWeight: 400,
    marginRight: 8,
    marginTop: 10,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    color: '#545454',
    padding: '0px 12px',
  },
}));

export default useStyles;
