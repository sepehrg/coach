import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  modalWrapper: {
    padding: 20,
  },
  titleWrapper: {
    background: theme.palette.secondary.main,
    borderRadius: 10,
    paddingLeft: 15,
    width: 400,
    height: 28,
  },
  subtitle: {
    margin: '34px 0 24px 15px',
  },
  radioWrapper: {
    margin: '0 0 15px 35px',
  },
  textarea: {
    margin: '0 0 10px 60px',
    borderRadius: 10,
    border: 'none',
    minWidth: 320,
    minHeight: 60,
    padding: 10,
    fontFamily: 'Montserrat',
    fontSize: 14,
    background: theme.palette.secondary.main,
    '&:focus': {
      outline: 'none',
    },
  },
  actionsWrapper: {
    padding: '0 15px 15px 0',
  },
}));

export default useStyles;
