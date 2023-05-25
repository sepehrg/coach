import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    height: 124,
    padding: '30px',
    background: 'linear-gradient(90.94deg, #FFFFFF -0.24%, #FFFFFF -0.23%, #F2F5FE 98.19%)',
    boxShadow: '0px 11px 13px rgba(188, 193, 232, 0.3)',
    borderRadius: '10px',
    margin: '6px auto',
    transition: 'all 0.3s ease-in-out',
    alignItems: 'center',
    flexWrap: 'nowrap',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.15)',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
    },
  },
  title: {
    color: '#311052',
    fontSize: 24,
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
    },
  },
  caption: {
    color: '#545454',
  },
  info: {
    paddingLeft: 25,
    textAlign: 'left',
  },
  disabled: {
    opacity: 0.5,
    '&:hover': {
      cursor: 'auto',
    },
  },
  selected: {
    background: 'linear-gradient(90.94deg, #e8e8e8 -0.24%, #ebebeb -0.23%, #c5c9d6 98.19%)',
  },
}));

export default useStyles;
