import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {},
  materialBox: {
    background: '#F2F5F7',
    borderRadius: 10,
    width: '99%',
    minWidth: '85vw',
    minHeight: 66,
    padding: '10px 25px',
    marginBottom: 10,
    cursor: 'pointer',
    transition: 'all',
    transitionDuration: '0.5s',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.15)',
    },
  },
  typeIconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  linkText: {
    width: '75%',
  },
  typeIcon: {
    width: 24,
    height: 24,
  },
  iconWrapper: {
    marginRight: 20,
    width: 37,
    height: 37,
    border: '0.5px dashed rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    width: '25%',
    minWidth: '25%',
  },
  likesContainer: {
    margin: '0px 10px',
  },
  likeIcon: {
    margin: '0px 0px',
    transform: 'scale(1.2)',
    padding: 5,
  },
  sourceText: {
    marginRight: 10,
    textAlign: 'left',
  },
});

export default useStyles;
