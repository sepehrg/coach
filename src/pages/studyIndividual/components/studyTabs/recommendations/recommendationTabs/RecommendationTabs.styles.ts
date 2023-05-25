import { Tab } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  tabs: {},
  wrapper: {
    marginTop: 5,
    borderRadius: 15,
    padding: '0 20px',
    borderBottom: '4px solid #C7CDF1',
    background: 'linear-gradient(180deg, rgba(245, 248, 255, 0.48) 0%, #F5F8FF 100%)',
  },
  indicator: {
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    height: 3,
    borderRadius: 10,
  },
  tab: {
    whiteSpace: 'pre-line',
  },
}));

export const CustomTab = withStyles(Tab, (theme) => ({
  root: {
    minWidth: 115,
    height: 55,
    minHeight: 'auto',
    [theme.breakpoints.down('md')]: {
      minWidth: 'auto',
      height: 50,
      fontSize: 13,
    },
  },
  selected: {},
  wrapped: {
    flexDirection: 'row' as const,
    '& img': {
      marginRight: 5,
      [theme.breakpoints.down('md')]: {
        width: 25,
      },
    },
  },
}));

export default useStyles;
