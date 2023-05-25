import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    position: 'absolute',
    width: 222,
    borderRadius: 10,
    background: '#F2F5F7',
    padding: '8px 6px',
    top: 50,
    right: 0,
    zIndex: 101,
  },
  settingsItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  settingsItemLng: {
    cursor: 'default',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  settingsItemIcon: {
    marginRight: 5,
  },
  languageBox: {
    display: 'flex',
    alignItems: 'center',
  },
  languageItem: {
    borderRadius: 5,
    background: '#C5CFD4',
    padding: 4,
    margin: '0px 5px',
    cursor: 'pointer',
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  languageItemActive: {
    background: theme.palette.common.white,
    cursor: 'default',
  },
  delimBox: {
    width: '80%',
    height: 3,
    background: theme.palette.common.white,
    margin: '10px auto',
  },
}));

export default useStyles;
