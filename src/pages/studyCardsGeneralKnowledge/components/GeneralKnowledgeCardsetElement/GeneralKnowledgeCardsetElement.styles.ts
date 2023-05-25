import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  textIconWrapper: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    marginTop: 10,
    marginRight: 25,
  },
  gradeLabel: {
    width: 35,
    height: 35,
    background: theme.palette.common.white,
    borderRadius: 20,
    marginRight: 15,
    marginTop: 4,
  },
  unfollowButton: {
    background: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
}));

export default useStyles;
