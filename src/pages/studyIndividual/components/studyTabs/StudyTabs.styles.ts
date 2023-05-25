import { Tab } from '@mui/material';
import { SelectedTab, UnselectedTab } from 'assets/images/icons';
import { makeStyles, withStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: any) => ({
  tabs: {
    alignItems: 'end',
    marginTop: 40,
  },
  tabPanels: {
    width: 982,
  },
  tab: {
    borderRadius: '50px 0px 0px 50px',
    margin: '18px 0 15px 10px',
    fontSize: 20,
    padding: 28,
    color: '#331355',
    borderBottom: '3px solid #BABFE7',
    boxShadow: '7px 2px 20px #babfe7',
    [theme.breakpoints.down('md')]: {
      fontSize: 17,
      padding: 23,
      margin: '15px 0 10px 10px',
    },
  },
  sidebar: {
    flexDirection: 'column',
    height: 'calc(100vh - 250px)',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  indicator: {
    display: 'none',
  },
  speedDial: {
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
  },
  speedDialAction: {
    padding: 30,
    '& img': {
      width: 60,
    },
  },
}));

export const CustomTab = withStyles(Tab, (theme) => ({
  root: {
    width: 250,
    alignSelf: 'end',
    background: `url(${UnselectedTab}) no-repeat 18px center`,
    [theme.breakpoints.down('md')]: {
      backgroundSize: 33,
      width: 235,
    },
  },
  selected: {
    width: 350,
    alignSelf: 'end',
    marginRight: 0,
    background: `url(${SelectedTab}) no-repeat 18px center`,
    [theme.breakpoints.down('md')]: {
      backgroundSize: 33,
    },
  },
  wrapped: {
    alignItems: 'self-start',
    paddingLeft: 75,
  },
}));

export default useStyles;
