import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  topWrapper: {
    marginBottom: 10,
    alignItems: 'center',
    flexWrap: 'nowrap',
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
  frame: {
    position: 'relative',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    minWidth: 30,
    padding: 5,
  },
}));

export default useStyles;
