import React from 'react';
import { Grid, Typography } from '@mui/material';
import useStyles from './GoalListItem.styles';
import { IStudyGoal } from '../StudyGoal';

interface GoalListItemProps {
  goal: IStudyGoal;
  disabled: boolean;
  isSelected: boolean;
}

const GoalListItem: React.FC<GoalListItemProps> = ({ goal, disabled, isSelected }) => {
  const { classes, cx } = useStyles();

  return (
    <Grid
      container
      className={cx(classes.root, disabled && classes.disabled, isSelected && classes.selected)}
    >
      <Grid item>
        <img src={goal.icon} alt={goal.title} />
      </Grid>
      <Grid item className={classes.info}>
        <Typography variant={'body1'} className={classes.title}>
          {goal.title}
        </Typography>
        <Typography variant={'body2'} className={classes.caption}>
          {goal.caption}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GoalListItem;
