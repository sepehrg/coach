import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  noteItem: {
    font: '400 14px Montserrat',
  },
  list: {
    width: 391,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: 178,
    overflow: 'auto',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 9,
    padding: '15px 10px',
  },
  checkboxRoot: {
    padding: 5,
  },
}));

export default useStyles;
