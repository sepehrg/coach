import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  materialBox: {
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    borderRadius: 20,
    width: '97%',
    minHeight: 66,
    padding: '10px 25px',
    margin: '5px 10px',
    cursor: 'pointer',
    transition: 'all',
    transitionDuration: '0.5s',
    justifyContent: 'space-between',
    boxShadow: '2px 2px 8px rgb(97 108 181 / 30%)',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.15)',
    },
  },
  customMaterialBox: {
    background: 'linear-gradient(102.27deg, #2AC44B 1.37%, #56CF73 29.53%, #F2F5FE 127%)',
    border: '1.8px solid #311053',
  },
  typeIconContainer: {
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  linkText: {
    // width: '75%',
  },
  name: {
    font: '400 22px Helvetica',
    color: '#390B52',
    paddingBottom: 5,
  },
  tags: {
    font: '400 16px Montserrat',
    color: '#8F9299',
  },
  customName: {
    color: '#FFFFFF',
  },
  customTags: {
    color: '#FFFFFF',
  },
  typeIcon: {
    filter: 'grayscale(100%)',
  },
  iconWrapper: {
    marginRight: 20,
    width: 37,
    height: 37,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
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
    whiteSpace: 'nowrap',
  },
});

export default useStyles;
