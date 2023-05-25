import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  backBtn: {
    width: 52,
    height: 52,
    backgroundColor: '#F2F5F7',
    position: 'absolute',
    left: '15%',
  },
  backBtnImage: {
    width: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '24px',
    marginTop: 20,
  },
  subjectsContainer: {
    justifyContent: 'center',
    overflow: 'auto',
    height: '80%',
  },
  subjectCard: {
    margin: '10px 8px 8px',
    fontWeight: 700,
    background: 'linear-gradient(105.36deg, #F5F8FF 6.32%, #F2F5FE 80.44%)',
    boxShadow: '0px 4px 7px 1px rgba(97, 108, 181, 0.3)',
  },
}));

export default useStyles;
