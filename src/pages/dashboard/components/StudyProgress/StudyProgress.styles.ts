import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  tooltipWrapper: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: '10px 20px',
    minWidth: 190,
  },
  tooltipText: {
    fontSize: 12,
  },
  tooltipTextMargin: {
    marginRight: 20,
  },
  tooltipTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 15,
  },
  background: {
    background: 'linear-gradient(180deg, #F2F5F7 0%, #EBEEF0 100%)',
    width: 200,
    height: 400,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 500,
    margin: '20px 26px 10px 34px',
  },
  progressLabel: {
    background: theme.palette.common.white,
    borderRadius: 40,
    marginTop: 20,
    height: 28,
    padding: '0 9px',
    maxWidth: 84,
  },
  progressImg: {
    marginRight: 10,
  },
}));

export default useStyles;
