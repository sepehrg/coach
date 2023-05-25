import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  font: {
    '&&&&&': {
      fontFamily: 'Montserrat',
      fontSize: '16px',
      margin: '0 2px',
      display: 'inline-block',
    },
  },
  inputEditable: {
    width: '100%',
    height: '100%',
    // maxHeight: 400,
    padding: 15,
    fontFamily: 'Montserrat',
    fontSize: '16px',
    overflowY: 'auto',
    '&:focus': {
      fontFamily: 'Montserrat',
      fontSize: '16px',
      outline: 'none',
    },
    '&[contenteditable]:empty:before': {
      content: 'attr(placeholder)',
      pointerEvents: 'none',
      color: theme.palette.secondary.dark,
    },
    '& svg': {
      width: '99%',
      height: '98%',
    },
  },

  mathPanel: {
    marginLeft: 15,
  },
  symbolButton: {
    width: 20,
    margin: 0,
    marginBottom: 5,
    height: 30,
    borderRadius: 5,
    background: 'none',
  },
  buttonGroupWrapper: {
    marginRight: 20,
    marginTop: '-30%',
    padding: '15px 0 0 15px',
    borderTop: '1px solid #ccc',
  },
}));

export default useStyles;
