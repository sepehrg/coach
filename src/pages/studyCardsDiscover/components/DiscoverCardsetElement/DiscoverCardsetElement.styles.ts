import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  textIconWrapper: {
    width: 39,
    height: 39,
    marginRight: 10,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    marginTop: 10,
    marginRight: 25,
  },
  unfollowButton: {
    background: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  number: {
    fontSize: 19,
  },
}));

export default useStyles;
