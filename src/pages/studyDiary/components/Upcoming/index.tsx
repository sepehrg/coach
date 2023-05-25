import React from 'react';
import useStyles from './Upcoming.styles';
import Typography from '@mui/material/Typography';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import moment from 'moment';
import { Task, TaskDto } from 'entities/Task';

interface UpcomingProps {
  tasks: Task[] | null;
  onTaskSelect: (elementId: string, task?: TaskDto, numberOfTasks?: number) => void;
}

const Upcoming: React.FC<WithTranslation & UpcomingProps> = ({ t, tasks, onTaskSelect }) => {
  const { classes } = useStyles();

  const examSelectHandler = (task: Task) => {
    onTaskSelect('', {
      id: task.id,
      title: task.title,
      type: task.type,
      subjectId: task.subject.id,
      startDate: task.startDate,
    } as TaskDto);
  };

  const renderExamList = () => {
    return tasks?.map((task) => (
      <Grid container className={classes.row} key={task.id} onClick={() => examSelectHandler(task)}>
        <Grid item className={classes.date}>
          {moment(task.startDate).format('DD.MM')}
        </Grid>
        <Grid item className={classes.title}>
          {task.title}
        </Grid>
      </Grid>
    ));
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs="auto">
          <Typography className={classes.appointments}>
            {t('Study.Important appointments')}
          </Typography>
        </Grid>
        <Grid item className={classes.column2} xs>
          {renderExamList()}
        </Grid>
      </Grid>
    </>
  );
};

export default withTranslation()(Upcoming);
