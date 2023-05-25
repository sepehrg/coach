import React from 'react';
import useStyles from './UpcomingTasksModal.styles';
import { withTranslation, WithTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { TaskDto, TaskType } from 'entities/Task';
import { useTasksActions } from 'store/tasks';
import { TrashcanIcon } from 'assets/images/icons';
import { DialogClose } from 'components/ui/PageInfo/assets';
import moment from 'moment';
import { Evening, Morning, Noon } from 'assets/images';
import { TaskTypeData } from 'pages/studyDiary';

interface UpcomingTasksModalProps {
  isOpen: boolean;
  tasks: TaskDto[];
  taskType: TaskType;
  onClose: () => void;
  dayHours: number[];
  taskTypesDatas: TaskTypeData[];
}

const UpcomingTasksModal: React.FC<WithTranslation & UpcomingTasksModalProps> = ({
  t,
  isOpen,
  tasks,
  onClose,
  dayHours,
  taskType,
  taskTypesDatas,
}) => {
  const { classes } = useStyles();
  const { delete: deleteTask } = useTasksActions();

  const onTaskDelete = (taskId: string, taskType: TaskType) => {
    deleteTask(taskId, taskType);
  };

  const getTaskText = (task: TaskDto) => {
    const text = task.title;
    if (text.length > 30) {
      return `${text.substring(0, 30)}...`;
    }
    return text;
  };

  const getTaskTimeImage = (task: TaskDto) => {
    const timeImageIndex = dayHours.indexOf(new Date(task.startDate).getHours());
    return (
      <img
        src={timeImageIndex === 0 ? Morning : timeImageIndex === 1 ? Noon : Evening}
        alt={timeImageIndex === 0 ? 'Morning' : timeImageIndex === 1 ? 'Noon' : 'Evening'}
        className="daytime"
        width={30}
      />
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
          {t(`Study.${taskTypesDatas.find((e) => e.taskType === taskType)?.title}`)}
          <IconButton onClick={onClose} size="large">
            <img src={DialogClose} width={14} alt={'Close Button'} />
          </IconButton>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{getTaskTimeImage(task)}</TableCell>
                  <TableCell>{moment(task.startDate).format('DD.MM.YYYY')}</TableCell>
                  <TableCell style={{ whiteSpace: 'pre-wrap' }}>{getTaskText(task)}</TableCell>

                  <TableCell>
                    <Button
                      disableElevation
                      className={classes.trashcan}
                      onClick={() => onTaskDelete(task.id, task.type)}
                    >
                      <img src={TrashcanIcon} alt="icon" width={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default withTranslation()(UpcomingTasksModal);
