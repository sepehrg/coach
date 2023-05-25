import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  header: {
    height: 110,
    padding: '20px 64px 20px',
  },
  messageBox: {
    background: theme.palette.secondary.main,
    borderRadius: 15,
    padding: 25,
    width: 300,
    height: 200,
    '&::after': {
      content: "' '",
      position: 'absolute',
      right: 105,
      top: 130,
      borderTop: '20px solid transparent',
      borderRight: 'none',
      borderLeft: `20px solid ${theme.palette.secondary.main}`,
      borderBottom: '20px solid transparent',
      zIndex: 10,
    },
  },
  body: {
    height: '78vh',
  },
  centerContainer: {
    width: 420,
    height: 420,
    marginTop: 30,
    position: 'relative',
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: '38%',
  },
  buttonBottom: {
    margin: '0 10px',
    width: 150,
  },
}));

export default useStyles;
