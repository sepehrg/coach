import { makeStyles } from 'tss-react/mui';
import { DiaryBg, DiarySide, IdoBgDiary } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  root: {
    flexWrap: 'nowrap',
  },
  column: {
    width: 187,
    marginTop: 23,
    [theme.breakpoints.down('md')]: {
      width: 146,
    },
  },
  ido: {
    background: `url(${IdoBgDiary}) right top no-repeat`,
    width: 1178,
    height: 407,
    [theme.breakpoints.down('md')]: {
      width: 933,
      height: 318,
      backgroundSize: 361,
    },
  },
  upcoming: {
    width: 730,
    height: 142,
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    borderRadius: 30,
    borderBottom: '6px solid #BABFE7',
    boxShadow: '0px 8px 14px 1px #c8ccef',
    marginTop: 35,
    padding: '15px 25px',
    [theme.breakpoints.down('md')]: {
      width: 600,
      height: 115,
    },
  },
  wrapper: {
    justifyContent: 'space-between',
  },
  diary: {
    flexDirection: 'column',
    background: `url(${DiaryBg}) no-repeat top left`,
    width: 1142,
    height: 800,
    marginTop: -200,
    marginLeft: 8,
    backgroundSize: 1145,
    [theme.breakpoints.down('md')]: {
      width: 911,
      height: 627,
      backgroundSize: 911,
      marginTop: -145,
    },
  },
  diaryContent: {
    flexDirection: 'column',
    rowGap: '40px',
    [theme.breakpoints.down('md')]: {
      rowGap: '0',
    },
  },
  header: {
    width: '86%',
    justifyContent: 'space-between',
    marginTop: 25,
    [theme.breakpoints.down('md')]: {
      width: '83%',
      height: 30,
      marginTop: 8,
    },
  },
  side: {
    width: 216,
    background: `url(${DiarySide}) no-repeat top right`,
    [theme.breakpoints.down('md')]: {
      width: 161,
      backgroundSize: 150,
    },
  },
}));

export default useStyles;
