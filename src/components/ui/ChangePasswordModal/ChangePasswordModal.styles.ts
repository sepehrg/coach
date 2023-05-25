import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    padding: 24,
    minWidth: 323,
    minHeight: 36,
  },
  modalTitle: { marginBottom: 22 },
  fieldBox: { marginBottom: 20 },
  fieldTitle: {
    marginBottom: 12,
  },
  buttonBox: {
    display: 'flex',
  },
  submitButton: { marginRight: 16, color: '#ffffff' },
  closeButton: { color: '#ffffff' },
  dialog: {
    borderRadius: 28,
  },
});

export default useStyles;
