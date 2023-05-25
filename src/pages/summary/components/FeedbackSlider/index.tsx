import React from 'react';
import { useStyles, sliderStyles } from './FeedbackSlider.styles';
import Slider from '@mui/material/Slider';
import { withTranslation, WithTranslation } from 'react-i18next';
import { withStyles } from 'tss-react/mui';

interface FeedbackSliderProps extends WithTranslation {
  selectedMark: number;
  onClick: (rate: number) => void;
}

const FeedbackSlider = ({ selectedMark, onClick, t }: FeedbackSliderProps & WithTranslation) => {
  const StyledMaterialUiSlider = withStyles(Slider, sliderStyles);
  const { classes } = useStyles();

  const marks = [
    {
      value: 1,
      label: t('Summary.No'),
    },
    {
      value: 2,
    },
    {
      value: 3,
      label: t('Summary.Partly'),
    },
    {
      value: 4,
    },
    {
      value: 5,
      label: t('Summary.Completed'),
    },
  ];

  const handleSliderChange = (event: any, newMark: number | number[]) => {
    onClick(newMark as number);
  };

  return (
    <div className={classes.sliderWrapper}>
      <StyledMaterialUiSlider
        defaultValue={selectedMark}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="off"
        step={1}
        marks={marks}
        min={1}
        max={5}
        onChangeCommitted={handleSliderChange}
      />
    </div>
  );
};

export default withTranslation()(FeedbackSlider);
