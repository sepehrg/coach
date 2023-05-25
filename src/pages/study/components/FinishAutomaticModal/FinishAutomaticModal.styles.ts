import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    width: 590,
    height: 380,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },
  fullWidth: {
    width: '95%',
    textAlign: 'center',
  },
  coloredBox: {
    borderRadius: 10,
    background: '#F2F5F7',
    padding: '5px 0',
  },
  countBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  countNumberText: {
    fontSize: 60,
    margin: '20px 0px',
    fontWeight: 400,
  },
  buttonsBox: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0px',
  },
  button: {
    '& span': {
      fontSize: 12,
    },
    padding: '6px 0px',
    width: '48%',
    margin: '0 5px',
  },
  refreshIcon: {
    width: 20,
    height: 20,
  },
  breakIcon: {
    width: 19,
    height: 19,
  },
  flagIcon: {
    width: 12,
    height: 13,
  },
  actionsBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default useStyles;
