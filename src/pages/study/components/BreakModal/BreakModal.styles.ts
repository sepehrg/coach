import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    width: 550,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  modalTitle: {
    background: '#F2F5F7',
    borderRadius: 10,
    padding: '10px 0px',
    width: '100%',
    textAlign: 'center',
  },
  marginBottom: {
    marginBottom: 15,
  },
  textTitle: {
    width: 400,
    wordBreak: 'break-word',
    fontSize: 20,
    marginTop: 15,
  },
  image: {
    marginTop: 20,
    maxWidth: 140,
    marginBottom: 30,
  },
  timer: {
    margin: '20px 0',
  },
  mainText: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default useStyles;
