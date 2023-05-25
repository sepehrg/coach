import { makeStyles } from 'tss-react/mui';
import { StudyCardsBg } from 'assets/images';

const useStyles = makeStyles()((theme) => ({
  container: {
    flexGrow: 1,
    padding: '0 0 0 20px',
    background: `url(${StudyCardsBg}) no-repeat top left`,
    [theme.breakpoints.down('md')]: {
      backgroundSize: 915,
    },
  },
}));

export default useStyles;
