import React from 'react';
import useStyles from './TaskTypeModal.styles';
import { Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { TaskType } from 'entities/Task';
import Box from '@mui/material/Box';
import { withTranslation, WithTranslation } from 'react-i18next';
import { DialogClose } from 'components/ui/PageInfo/assets';
import { Arrow, IdoIcon, TrashcanIcon } from 'assets/images/icons';
import { useSelector } from 'react-redux';
import { tasksSelector } from 'store/tasks/tasks.selectors';
import { useTasksActions } from 'store/tasks';
import { TaskTypeData } from 'pages/studyDiary';

interface TaskTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskTypeSelect: (type: TaskType) => void;
  showTaskTypes: boolean;
  taskTypesDatas: TaskTypeData[];
}

const TaskTypeModal: React.FC<TaskTypeModalProps & WithTranslation> = ({
  isOpen,
  onClose,
  onTaskTypeSelect,
  showTaskTypes,
  taskTypesDatas,
  t,
}) => {
  const { classes, cx } = useStyles();
  const { selectedItem: selectedTask } = useSelector(tasksSelector);
  const { delete: deleteTask } = useTasksActions();

  const getTaskTypeIcon = (taskType: TaskType) =>
    taskTypesDatas.find((icon) => icon.taskType === taskType)?.icon;

  const onTaskDelete = (taskId: string, taskType: TaskType) => {
    deleteTask(taskId, taskType);
    onClose();
  };

  const getTaskIcon = (taskType: TaskType) => {
    const task = taskTypesDatas.find((task) => task.taskType === taskType);
    return (
      <Grid container direction="column" alignItems="center">
        <img src={task?.icon} alt={task?.taskType} width={77} />
        {taskType !== TaskType.EXAM && (
          <Typography className={classes.header}>{t(`Study.${task?.title}`)}</Typography>
        )}
      </Grid>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: classes.dialog,
      }}
      BackdropProps={{
        className: classes.backdrop,
      }}
    >
      <DialogContent>
        <Box className={classes.close}>
          <IconButton onClick={onClose} size="large">
            <img src={DialogClose} width={14} alt={'Close Button'} />
          </IconButton>
        </Box>
        <Grid container className={classes.root}>
          {selectedTask && (
            <Grid item className={classes.deleteTask}>
              <Grid container wrap="nowrap" spacing={5}>
                {getTaskIcon(selectedTask.type)}
                <Grid item>
                  <img src={Arrow} className={classes.arrow} alt="delete" />
                </Grid>
                <Grid item>
                  <Button
                    disableElevation
                    className={classes.trashcan}
                    onClick={() => onTaskDelete(selectedTask.id, selectedTask.type)}
                  >
                    <img src={TrashcanIcon} alt="icon" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          {showTaskTypes && (
            <Grid item container className={cx(selectedTask && classes.sectionsSpace)}>
              <Grid item className={classes.ido}>
                <Button
                  className={classes.idoButton}
                  onClick={() => onTaskTypeSelect(TaskType.IDO)}
                >
                  <img src={IdoIcon} alt="ido" />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  className={classes.activity}
                  onClick={() => onTaskTypeSelect(TaskType.FAMILY)}
                >
                  <img src={getTaskTypeIcon(TaskType.FAMILY)} alt="icon" />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  className={classes.activity}
                  onClick={() => onTaskTypeSelect(TaskType.FRIENDS)}
                >
                  <img src={getTaskTypeIcon(TaskType.FRIENDS)} alt="icon" />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disableElevation
                  className={classes.activity}
                  onClick={() => onTaskTypeSelect(TaskType.TIME_FOR_MYSELF)}
                >
                  <img src={getTaskTypeIcon(TaskType.TIME_FOR_MYSELF)} alt="icon" />
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(TaskTypeModal);
