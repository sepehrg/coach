import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  sidebar: {
    background: theme.palette.secondary.main,
    borderRadius: 10,
    padding: '5px',
    width: 120,
    margin: '40px 20px',
  },
  menuButton: {
    height: 90,
    width: 85,
    background: theme.palette.common.white,
    fontWeight: 600,
    fontSize: 12,
    margin: 8,
  },
  blueButton: {
    background: theme.palette.primary.main,
  },
  blueButtonLabel: {
    color: theme.palette.common.white,
  },
  menuLabel: {
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 1.5,
    paddingTop: 10,
  },
  copyImg: {
    color: theme.palette.secondary.main,
  },
}));

export default useStyles;
