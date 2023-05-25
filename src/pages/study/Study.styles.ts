import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    padding: '32px 60px',
    height: '100%',
  },
  title: {
    color: '#B3B4BD',
  },
  topWrapper: {
    maxWidth: '100vw',
    marginBottom: 40,
  },
  helpImg: {
    width: 16,
    height: 16,
    marginLeft: 30,
    cursor: 'pointer',
  },
  buttonsContainer: {
    marginTop: 24,
  },
  typeButton: {
    maxHeight: 44,
    padding: '16px 10px',
  },
  typeButtonActive: {
    background: '#F2F5F7',
  },
  materialsContainer: {
    width: '100%',
    minHeight: 470,
    maxHeight: 470,
    overflow: 'auto',
    paddingRight: 10,
  },
});

export default useStyles;
