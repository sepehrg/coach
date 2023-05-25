import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  sliderWrapper: {
    width: '100%',
    padding: '20px 20px 40px',
    margin: '0 30px',
  },
});

const sliderStyles = {
  thumb: {
    height: '24px',
    width: '24px',
    color: '#390B52',
    marginTop: -9,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  mark: {
    height: '11px',
    width: '11px',
    color: '#C4C4C4',
    borderRadius: '50%',
    marginTop: -3,
    marginLeft: -5,
  },
  markActive: {
    display: 'none',
  },
  track: {
    height: '5px',
    color: '#390B52',
  },
  markLabel: {
    color: 'gray',
    fontWeight: 100,
    fontSize: '13px',
    marginTop: 10,
    '&[data-index="0"]': {
      transform: 'none',
    },
    '&[data-index="4"]': {
      transform: 'translateX(-100%)',
    },
  },
  active: {},
  rail: {
    color: '#C4C4C4',
    height: '5px',
    borderRadius: '10px',
    opacity: 1,
  },
};

export { useStyles, sliderStyles };
