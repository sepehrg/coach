import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  schedule: {
    flexDirection: 'column',
  },
  header: {
    margin: 23,
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: 14,
    },
  },
  calendarItem: {
    padding: '8px 50px',
    borderRight: '1px solid rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('md')]: {
      padding: '6px 15px',
    },
  },
  calendar: {
    background: '#F2F5FE',
    boxShadow: '4px 4px 18px rgba(0, 0, 0, 0.08)',
    borderRadius: 8,
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  ido: {
    padding: '0 20px',
    [theme.breakpoints.down('md')]: {
      padding: '0 8px',
    },
  },
  idoButton: {
    background: 'none',
    width: 87,
    [theme.breakpoints.down('md')]: {
      width: 75,
      padding: 0,
    },
  },
  activity: {
    height: 72,
    margin: '0 5px',
    background: '#F5F8FF',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 12,
    font: '400 16px Montserrat',
    color: '#545454',
    [theme.breakpoints.down('md')]: {
      padding: 0,
      height: 62,
      fontSize: 14,
      '& img': {
        // width: '70%',
      },
    },
  },
  buttonLabel: {
    padding: '0 5px',
    font: '500 15px Montserrat',
  },
  trashcan: {
    width: 70,
    background: 'rgba(220, 54, 134, 0.24)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.14) !important',
  },
  animate: {
    animation: '$glow 1s linear infinite',
  },
  '@keyframes glow': {
    '0%': {
      filter: 'none',
      transform: 'scale(1, 1)',
    },
    '50%': {
      filter: 'drop-shadow(0px 0px 5px rgba(255, 255, 0, 1))',
      transform: 'scale(1.2, 1.2)',
    },
    '100%': {
      filter: 'none',
      transform: 'scale(1, 1)',
    },
  },
  content: {
    padding: '20px 50px 5px 50px',
  },
  table: {
    textAlign: 'center',
    width: '100%',
    '& th': {
      width: 140,
      padding: 8,
      color: '#ffffff',
      font: '700 18px Montserrat',
      background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
      [theme.breakpoints.down('md')]: {
        font: '700 15px Montserrat',
      },
    },
    '& th:first-child': {
      width: 95,
      borderTopLeftRadius: 12,
      [theme.breakpoints.down('md')]: {
        width: 80,
      },
    },
    '& th:last-child': {
      borderTopRightRadius: 12,
    },
    '& img.daytime': {
      width: 88,
      height: 162.75,
      [theme.breakpoints.down('md')]: {
        width: 70,
        height: 124.62,
      },
    },
    '& tbody': {
      '& td': {
        border: '1px solid #CDCDCD',
      },
      '& td:first-child': {
        textAlign: 'center',
      },
    },
  },
  dropZone: {
    width: 134.72,
    height: 164.61,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      width: 104.45,
      height: 126.48,
    },
  },
  emptyDropZone: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 30,
      color: theme.palette.primary.main,
    },
  },
  dayAtivity: {
    display: 'flex',
    background: '#CADAEA',
    flexGrow: 1,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
    },
    '& img': {
      [theme.breakpoints.down('md')]: {
        width: '40%',
      },
    },
    '& span': {
      width: '100%',
      padding: '0 5px 0 5px',
      '&.multi': {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      '&.single': {
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
      },
    },
  },
  idoActivity: {
    background: 'rgba(16, 33, 82, 0.92)',
  },
  hovering: {
    backgroundColor: '#e1eefb',
  },
  infoItem: {
    marginLeft: 35,
    padding: '10px 14px',
    borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      padding: '2px 2px',
    },
  },
  infoIcon: {
    fontSize: 45,
    color: theme.palette.primary.main,
  },
  drag: {
    position: 'relative',
    zIndex: 1,
  },
  addIcon: {
    width: 38,
    height: 38,
  },
  weekChoice: {
    padding: '0px 50px',
    width: '100%',

    '& :first-child': {
      color: '#ffffff',
      font: '700 18px Montserrat',
      background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
      [theme.breakpoints.down('md')]: {
        font: '700 15px Montserrat',
      },
      display: 'flex',
      justifyContent: 'space-between',
      lineHeight: '30px',
      height: 30,
      fontSize: 'large',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      alignItems: 'center',
    },
  },
}));

export default useStyles;
