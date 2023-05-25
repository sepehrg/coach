import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: any) => ({
  outlinedButton: {
    maxWidth: '35px!important',
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#DCE2E6',
  },
  deleteButton: {
    background: theme.palette.warning.main,
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 10,
    marginRight: 15,
  },
  popup: {
    padding: 20,
  },
  popupText: {
    margin: '0 0 20px 10px',
  },
  popupIcon: {
    color: theme.palette.warning.main,
  },
  popupButton: {
    marginRight: 10,
  },
  unfollowButton: {
    background: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
}));

export default useStyles;
