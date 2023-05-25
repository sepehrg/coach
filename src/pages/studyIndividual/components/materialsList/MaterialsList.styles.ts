import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  materialsContainer: {
    width: '100%',
    minHeight: '60vh',
    maxHeight: '60vh',
    marginTop: 20,
    overflow: 'scroll',
  },
  title: {
    font: '500 16px Montserrat',
    color: '#000000',
    margin: '12px 0 0 20px',
  },
}));

export default useStyles;
