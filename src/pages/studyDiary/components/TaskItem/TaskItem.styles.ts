import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 15px',
    background: '#F2F5F7',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    transition: 'background',
    transitionDuration: '1s',
  },
  greenBox: {
    background: '#46D943',
  },
  checkBox: {
    marginRight: 5,
  },
  deleteIcon: {
    marginLeft: 5,
  },
});

export default useStyles;
