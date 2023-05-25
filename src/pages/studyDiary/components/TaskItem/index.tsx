import React, { useState, useEffect, useCallback } from 'react';
import useStyles from './TaskItem.styles';
import { Task, TaskType } from 'entities/Task';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { withTranslation, WithTranslation } from 'react-i18next';
import _ from 'lodash-es';

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onSelect: () => void;
}

const TaskItem: React.FC<TaskItemProps & WithTranslation> = ({ task, onDelete, onSelect, t }) => {
  const { classes } = useStyles();

  const [checked, setChecked] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<number>();

  useEffect(() => {
    if (checked) {
      setTimerId(_.delay(onDelete, 2000));
    } else {
      clearTimeout(timerId);
      setTimerId(undefined);
    }
  }, [checked, setTimerId, onDelete, timerId]);

  const handleCheck = useCallback(() => {
    setChecked((prevState) => !prevState);
  }, [setChecked]);

  const remainingTime = (days: number) => {
    if (days > 0) {
      return `${days} ${t('Study.days left')}`;
    } else if (days === 0) {
      return `${t('Study.for today')}`;
    } else {
      return `${-days} ${t('Study.days overdue')}`;
    }
  };

  return (
    <Box className={checked ? `${classes.root} ${classes.greenBox}` : classes.root}>
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        {task.type === TaskType.HOMEWORK && (
          <Checkbox
            checked={checked}
            color={'primary'}
            className={classes.checkBox}
            onClick={handleCheck}
          />
        )}
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant={'body2'}>{task.title}</Typography>
          <Typography variant={'body1'}>{task.subject?.name || ''}</Typography>
        </Box>
        <IconButton onClick={onDelete} className={classes.deleteIcon} size="large">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={onSelect} className={classes.deleteIcon} size="large">
          <EditIcon />
        </IconButton>
      </Box>
      <Typography variant={'h2'}>
        {remainingTime(moment(task.startDate).diff(moment().startOf('day'), 'd'))}
      </Typography>
    </Box>
  );
};

export default withTranslation()(TaskItem);
