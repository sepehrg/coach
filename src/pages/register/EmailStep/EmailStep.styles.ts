import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  root: { position: 'relative', display: 'flex', flexDirection: 'column' },
  button: {
    alignSelf: 'center',
  },
  stepTitle: { marginBottom: '12px', display: 'flex', justifyContent: 'space-between' },
});

export default useStyles;
