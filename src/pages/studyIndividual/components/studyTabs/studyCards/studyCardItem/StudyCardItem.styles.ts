import { makeStyles } from 'tss-react/mui';
import { StudyCardCover } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  button: {
    border: 'none',
    background: 'none',
    padding: 0,
    cursor: 'pointer',
    margin: '15px 15px 10px',
    [theme.breakpoints.down('md')]: {
      margin: '15px 6px 0',
    },
  },
  itemWrapper: {
    flexDirection: 'column',
    width: 204,
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    borderRadius: 30,
    borderBottom: '3px solid #BABFE7',
    boxShadow: '1px 1px 10px rgb(97 108 181 / 30%)',
    [theme.breakpoints.down('md')]: {
      width: 173,
    },
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 10px 10px',
    height: 297,
    flexWrap: 'nowrap',
  },
  coverImage: {
    position: 'relative',
    width: 119,
    height: 119,
    background: `url(${StudyCardCover})`,
    marginBottom: 20,
  },
  addCoverImage: {
    width: 147,
    height: 147,
    backgroundSize: 147,
    marginTop: 30,
  },
  cardCount: {
    position: 'absolute',
    top: 36,
    left: 71,
    width: 28,
    transform: 'rotate(5deg)',
    textAlign: 'center',
  },
  addCardPlus: {
    position: 'absolute',
    top: 47,
    left: 91,
  },
  number: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 700,
  },
  plus: {
    fontSize: 37,
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
    color: '#390B52',
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
  },
  tags: {
    width: '100%',
    height: 94,
    overflow: 'hidden',
  },
  tag: {
    fontSize: 12,
    fontWeight: 400,
    marginRight: 6,
    marginTop: 6,
    borderRadius: 90,
    background:
      'linear-gradient(178.62deg, rgba(11, 35, 82, 0.07) 6.13%, rgba(57, 11, 82, 0.07) 84.66%)',
    color: '#545454',
    padding: '0px 7px',
  },
}));

export default useStyles;
