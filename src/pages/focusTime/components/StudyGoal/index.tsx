import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './StudyGoal.styles';
import GoalListItem from '../GoalListItem';
import { Concentrate, Homework, NextExam } from 'assets/images/icons';
import { WithTranslation, withTranslation } from 'react-i18next';

interface StudyGoalProps {
  selectedGoalTitle: string;
  handleSelect: (goal: string) => void;
  disabled: boolean;
}

export interface IStudyGoal {
  title: string;
  icon: string;
  caption?: string;
}

const StudyGoal: React.FC<StudyGoalProps & WithTranslation> = ({
  selectedGoalTitle,
  handleSelect,
  disabled,
  t,
}) => {
  const { classes, cx } = useStyles();

  const STUDY_GOALS: IStudyGoal[] = [
    { title: t('Study.Select Goal.Study concentrated'), icon: Concentrate },
    { title: t('Study.Select Goal.Do your homework'), icon: Homework },
    {
      title: t('Study.Select Goal.Prepare for your next exam'),
      icon: NextExam,
    },
  ];

  return (
    <>
      <Grid container className={classes.goalContainer}>
        {STUDY_GOALS.map((goal, index) => {
          return (
            <Grid
              item
              className={cx(classes.item)}
              key={index}
              onClick={() => (disabled ? {} : handleSelect(goal.title))}
            >
              <GoalListItem
                disabled={disabled}
                goal={goal}
                isSelected={goal.title === selectedGoalTitle}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default withTranslation()(StudyGoal);
