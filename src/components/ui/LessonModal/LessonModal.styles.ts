import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {},
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: 360,
    minHeight: 340,
  },
  descriptionBox: {
    maxWidth: 312,
    wordWrap: 'break-word',
  },
  smileImg: {
    width: 32,
    height: 32,
  },
});

export default useStyles;
