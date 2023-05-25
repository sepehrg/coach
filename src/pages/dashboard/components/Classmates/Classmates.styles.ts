import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    padding: '10px 0px 5px 20px',
    borderRadius: '10px',
  },
  classmatesWrapper: {
    maxWidth: '80%',
    height: 68,
    bottom: '-2px',
    overflowY: 'hidden',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
  },
  studentWrapper: {
    margin: '0 20px',
    textAlign: 'center',
  },
  studentImg: {
    maxHeight: 40,
    maxWidth: 40,
    borderRadius: 25,
  },
  name: {
    weight: 400,
    fontSize: 12,
  },
  title: {
    marginRight: 20,
  },
  idoWrapper: {
    width: 40,
    height: 40,
    background: '#9FCDF9',
    borderRadius: 25,
    border: '2px solid #FEFEFE',
  },
  ido: {
    width: 28,
    height: 26,
    marginTop: 6,
  },
  emptyText: {
    width: '53%',
    marginLeft: 10,
  },
}));

export default useStyles;
