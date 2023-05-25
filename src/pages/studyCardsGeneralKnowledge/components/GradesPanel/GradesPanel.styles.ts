import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  button: {
    width: 100,
    height: 35,
    borderRadius: 10,
    background: theme.palette.secondary.main,
    margin: '10px 10px 0 0',
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
  selected: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
