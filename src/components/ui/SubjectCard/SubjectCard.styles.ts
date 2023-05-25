import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    width: 120,
    minHeight: 120,
    maxHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 30,
    background: '#F2F5F7',
    margin: 10,
    transition: 'background',
    transitionDuration: '.5s',
    cursor: 'pointer',
    wordWrap: 'break-word',
  },
  active: {
    background: '#DCE2E6',
  },
  img: {
    maxWidth: 70,
    maxHeight: 70,
    margin: 'auto',
  },
  iconWrapper: {
    height: 80,
    paddingTop: 10,
  },
  label: {
    marginBottom: 12,
  },
});

export default useStyles;
