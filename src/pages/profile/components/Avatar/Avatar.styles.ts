import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: 20,
  },
  avatarWrapper: {
    margin: 25,
    position: 'relative',
  },
  uploadButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginLeft: 10,
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    padding: 6,
    minWidth: 'auto',
  },
  avatarIcon: {
    width: 164,
    height: 164,
    border: '5px solid #FFFFFF',
    boxShadow: '0px 12px 13px rgb(0 0 0 / 10%)',
    [theme.breakpoints.down('md')]: {
      width: 130,
      height: 130,
    },
  },
}));

export default useStyles;
