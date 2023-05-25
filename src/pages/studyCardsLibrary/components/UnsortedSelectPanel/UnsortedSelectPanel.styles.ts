import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  card: {
    background: theme.palette.secondary.main,
    width: 280,
    borderRadius: 10,
    minHeight: 200,
    maxHeight: 200,
    overflowY: 'auto',
    margin: '20px 10px 5px',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    padding: 15,
  },
  selectWrapper: {
    minWidth: '95%',
    marginTop: '25px !important',
  },
  selectRoot: {
    height: 21,
    paddingTop: 10,
    '&:focus': {
      background: 'none',
    },
  },
  nativeInput: {
    borderBottom: 'none',
  },
  select: {
    paddingTop: 10,
  },
  selectMenu: {
    marginTop: 25,
  },
  label: {
    fontSize: 21,
    fontWeight: 600,
    color: '#390B52',
    fontFamily: 'Montserrat',
  },
  focusedLabel: {
    paddingTop: 0,
    color: '#390B52 !important',
  },
  shrinkLabel: {
    paddingTop: 0,
    color: '#390B52',
  },
  saveButton: {
    width: 130,
    height: 44,
    marginLeft: 10,
    marginTop: 25,
  },
  itemWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
}));

export default useStyles;
