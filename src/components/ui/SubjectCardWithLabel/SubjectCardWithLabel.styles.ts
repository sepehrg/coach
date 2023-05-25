import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  subjectWrapper: {
    minWidth: 142,
    maxWidth: 142,
    minHeight: 132,
    maxHeight: 132,
    position: 'relative',
  },
  countLabel: {
    width: 39,
    height: 39,
    position: 'absolute',
    right: 8,
    top: -10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: 18,
    background: '#d4d4d4',
    borderRadius: '50%',
  },
  activeLabel: {
    background: 'linear-gradient(178.62deg, #0B2352 6.13%, #390B52 84.66%)',
    color: theme.palette.common.white,
  },
  subjectCard: {
    margin: '10px 5px 0',
    fontWeight: 700,
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    boxShadow: '0px 4px 7px 1px rgba(97, 108, 181, 0.3)',
  },
}));

export default useStyles;
