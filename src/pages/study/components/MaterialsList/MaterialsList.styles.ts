import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  helpImg: {
    width: 16,
    height: 16,
    marginLeft: 30,
    cursor: 'pointer',
  },
  buttonsContainer: {
    marginTop: 24,
  },
  typeButton: {
    maxHeight: 44,
    padding: '16px 10px',
  },
  typeButtonActive: {
    background: '#F2F5F7',
  },
  materialsContainer: {
    width: '100%',
    minHeight: '50vh',
    maxHeight: '50vh',
    marginTop: 20,
  },
  topic: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  slider: {
    padding: '15px 0',
    width: '100%',
    height: '25px',
    position: 'relative',
    overflow: 'hidden',
    marginTop: 14,
    borderBottom: '2px solid rgba(0, 0, 0, 0.03)',
  },
  tagBtn: {
    backgroundColor: theme.palette.common.white,
    minWidth: 136,
    height: 44,
    border: '1px solid #F1F5F6',
    marginRight: 20,
  },
  tagBtnActive: {
    backgroundColor: '#F2F5F7',
  },
  label: {
    color: '#383541',
    fontWeight: 600,
    fontSize: 14,
  },
  buttonsWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '-2x',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    paddingBottom: 15,
    height: 60,
  },
  anotherLinkBtn: {
    position: 'absolute',
    bottom: 20,
  },
  emptyStateWrapper: {
    maxHeight: '54vh',
    minHeight: '54vh',
    backgroundColor: '#F2F5F7',
    borderRadius: 10,
    marginTop: 40,
  },
  emptyStateImage: {
    maxHeight: '25vh',
  },
  emptyStateTopText: {
    marginBottom: 42,
  },
  emptyStateBottomText: {
    marginTop: 22,
  },
  pagination: {
    position: 'absolute',
    bottom: -34,
  },
}));

export default useStyles;
