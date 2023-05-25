import React from 'react';
import { Button, Grid } from '@mui/material';
import { Grade } from 'entities/Grade';
import useStyles from './GradesPanel.styles';
import { WithTranslation, withTranslation } from 'react-i18next';

interface GradesPanelProps {
  grades?: Grade[];
  selectedGrades?: Grade[];
  onGradeClick: (grade: Grade | 'all') => void;
}

const GradesPanel: React.FC<GradesPanelProps & WithTranslation> = (props) => {
  const { grades, selectedGrades, onGradeClick, t } = props;
  const { classes } = useStyles();

  const renderButtons = () => {
    if (!grades) return;

    return grades?.map((grade: Grade) => {
      let index = -1;
      const allSelected = JSON.stringify(selectedGrades) === JSON.stringify(grades);
      if (selectedGrades) {
        index = selectedGrades?.findIndex((selectedGrade) => selectedGrade.year === grade.year);
      }
      return (
        <Button
          key={grade.year}
          onClick={() => {
            onGradeClick(grade);
          }}
          className={
            index >= 0 && !allSelected
              ? `${classes.button} ${classes.selected}`
              : `${classes.button}`
          }
        >
          {`${t('Study Cards.Discover.Year')} ${grade.year}`}
        </Button>
      );
    });
  };

  return (
    <Grid md={12} lg={12}>
      <Button
        onClick={() => {
          onGradeClick('all');
        }}
        className={
          JSON.stringify(selectedGrades) === JSON.stringify(grades)
            ? `${classes.button} ${classes.selected}`
            : `${classes.button}`
        }
      >
        {t('Study Cards.Discover.All')}
      </Button>
      <>{renderButtons()}</>
    </Grid>
  );
};

export default withTranslation()(GradesPanel);
