import React from 'react';
import useStyles from './CalendarProgress.style';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { TaskDto, TaskType } from 'entities/Task';

interface CalendarProgressProps {
  tasks: TaskDto[];
}

const CalendarProgress: React.FC<WithTranslation & CalendarProgressProps> = ({ tasks }) => {
  const { classes } = useStyles();

  const height = Math.min(100, tasks.filter((task) => task.type === TaskType.IDO).length * 25);

  return (
    <Grid container className={classes.calendarProgress}>
      <Grid item className={classes.cylinderItem}>
        <Grid container className={classes.cylinder}>
          <Grid item className={classes.top}></Grid>
          <Grid item container className={classes.glass}>
            <Grid
              item
              className={classes.liquid}
              style={{
                height: `${height}%`,
              }}
            ></Grid>
          </Grid>
          <Grid item className={classes.bottom}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(CalendarProgress);
