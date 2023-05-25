import React, { useRef, useState } from 'react';
import useStyles from './Schedule.styles';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { IdoIcon, Add } from 'assets/images/icons';
import { Evening, Morning, Noon } from 'assets/images';
import { TaskDto, TaskType } from 'entities/Task';
import { QuestionCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { TaskTypeData } from 'pages/studyDiary';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface ScheduleProps {
  dayHours: number[];
  onOpenModal: (elementId: string, task?: TaskDto, numberOfTasks?: number) => void;
  openUpcomingTasksByType: (taskType: TaskType) => void;
  tasks: TaskDto[];
  taskTypesDatas: TaskTypeData[];
  onSelectedRelativeWeekChange: (relativeWeek: number) => void;
}

const Schedule: React.FC<ScheduleProps & WithTranslation> = ({
  t,
  onOpenModal,
  openUpcomingTasksByType,
  tasks,
  dayHours,
  taskTypesDatas,
  onSelectedRelativeWeekChange,
}) => {
  const { classes, cx } = useStyles();
  const dropZonesRef = useRef(null);
  const [hoveringElementId, setHoveringElementId] = useState('');
  const [selectedRelativeWeek, setSelectedRelativeWeek] = useState(0);

  const getTaskTypeIcon = (taskType: TaskType) =>
    taskTypesDatas.find((icon) => icon.taskType === taskType)?.icon;

  const isWeeklyTask = (task: TaskDto, dayIndex: number) => task.dayOfWeek === dayIndex + 1;

  const isMonthlyTask = (task: TaskDto, date: Date) => task.dayOfMonth === date.getDate();

  const isOnceTask = (task: TaskDto, date: Date) =>
    !task.dayOfWeek &&
    !task.dayOfMonth &&
    moment.utc(task.startDate).format('YYYY-MM-DD') === moment.utc(date).format('YYYY-MM-DD');

  const isDueHourFulfilled = (task: TaskDto, hour: number) =>
    moment.utc(task.startDate).get('hour') === hour;

  const getWeeksDates = () => {
    const weekDates = [];
    const startOfWeek = moment.utc().startOf('isoWeek').add(selectedRelativeWeek, 'week');
    for (let i = 0; i <= 6; i++) {
      weekDates.push(moment.utc(startOfWeek).add(i, 'day').toDate());
    }
    return weekDates;
  };

  const getCurrentWeekText = () => {
    const startOfWeek = moment().startOf('isoWeek').add(selectedRelativeWeek, 'week').toDate();
    const endOfWeek = moment(startOfWeek).add(6, 'day').toDate();
    return `${moment(startOfWeek).format('DD.MM.YYYY')} - ${moment(endOfWeek).format(
      'DD.MM.YYYY',
    )}`;
  };

  const renderDropZones = () => {
    return dayHours.map((hour) =>
      getWeeksDates().map((date, dayIndex) => {
        const elementId = `${moment.utc(date).format('YYYY-MM-DD')} ${hour}:00`;
        return (
          <Grid item container key={elementId} id={elementId} className={classes.dropZone}>
            {getCellContent(date, dayIndex, hour, elementId)}
          </Grid>
        );
      }),
    );
  };

  const renderTask = (task: TaskDto, elementId: string, numberOfTasks: number) => {
    return (
      <Grid
        item
        container
        key={task.id}
        className={cx(classes.dayAtivity, task.type === TaskType.IDO && classes.idoActivity)}
        onClick={() => onOpenModal(elementId, task, numberOfTasks)}
      >
        <Grid item container direction="column" justifyContent="center" alignItems="center">
          <img src={getTaskTypeIcon(task.type)} alt="icon" />
          <span className={numberOfTasks > 1 ? 'multi' : 'single'}>
            {task.type !== TaskType.IDO && task.title}
          </span>
        </Grid>
      </Grid>
    );
  };

  const toggleHoveringElementId = (elementId: string, isHovering: boolean) => {
    if (isHovering) setHoveringElementId(elementId);
    else if (hoveringElementId === elementId) setHoveringElementId('');
  };

  const renderEmptyCell = (elementId: string) => {
    return (
      <Grid
        item
        container
        key={elementId}
        id={elementId}
        className={classes.emptyDropZone}
        onClick={() => onOpenModal(elementId)}
        onMouseEnter={() => toggleHoveringElementId(elementId, true)}
        onMouseLeave={() => toggleHoveringElementId(elementId, false)}
      >
        {hoveringElementId === elementId ? (
          <img src={Add} className={classes.addIcon} alt="add" />
        ) : (
          ''
        )}
      </Grid>
    );
  };

  const getCellContent = (date: Date, dayIndex: number, hour: number, elementId: string) => {
    const cellTasks = tasks.filter(
      (task) =>
        (isWeeklyTask(task, dayIndex) || isMonthlyTask(task, date) || isOnceTask(task, date)) &&
        isDueHourFulfilled(task, hour),
    );
    if (cellTasks.length > 0)
      return cellTasks.map((task) => renderTask(task, elementId, cellTasks.length));
    else return renderEmptyCell(elementId);
  };

  const changeSelectedRelativeWeek = (relativeWeek: number) => {
    onSelectedRelativeWeekChange(relativeWeek);
    setSelectedRelativeWeek(relativeWeek);
  };

  return (
    <Grid container className={classes.schedule}>
      <Grid item>
        <Grid container className={classes.header}>
          <Grid item className={classes.calendarItem}>
            <Button
              disableElevation
              className={classes.calendar}
              onClick={() => onOpenModal('0', { type: TaskType.EXAM } as TaskDto)}
            >
              <img src={getTaskTypeIcon(TaskType.EXAM)} alt="Exam" />
            </Button>
          </Grid>
          <Grid item className={classes.ido}>
            <Button
              disableElevation
              className={classes.idoButton}
              onClick={() => openUpcomingTasksByType(TaskType.IDO)}
            >
              <img src={IdoIcon} alt="ido" />
            </Button>
          </Grid>
          <Grid item>
            <Button
              disableElevation
              className={classes.activity}
              onClick={() => openUpcomingTasksByType(TaskType.FAMILY)}
            >
              <img src={getTaskTypeIcon(TaskType.FAMILY)} alt="icon" />
              <Typography className={classes.buttonLabel}>{t('Study.Family')}</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              disableElevation
              className={classes.activity}
              onClick={() => openUpcomingTasksByType(TaskType.FRIENDS)}
            >
              <img src={getTaskTypeIcon(TaskType.FRIENDS)} alt="icon" />
              <Typography className={classes.buttonLabel}>{t('Study.Friends')}</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              disableElevation
              className={classes.activity}
              onClick={() => openUpcomingTasksByType(TaskType.TIME_FOR_MYSELF)}
            >
              <img src={getTaskTypeIcon(TaskType.TIME_FOR_MYSELF)} alt="icon" />
              <Typography className={classes.buttonLabel}>{t('Study.Time for myself')}</Typography>
            </Button>
          </Grid>
          <Grid item className={classes.infoItem}>
            <IconButton size="large">
              <QuestionCircleOutlined className={classes.infoIcon} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.content}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>{t('Study.Time')}</th>
              <th>{t('Study.WeekDays.Monday')}</th>
              <th>{t('Study.WeekDays.Tuesday')}</th>
              <th>{t('Study.WeekDays.Wednesday')}</th>
              <th>{t('Study.WeekDays.Thursday')}</th>
              <th>{t('Study.WeekDays.Friday')}</th>
              <th>{t('Study.WeekDays.Saturday')}</th>
              <th>{t('Study.WeekDays.Sunday')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={Morning} alt="morning" className="daytime" />
              </td>
              <td colSpan={7} rowSpan={3}>
                <Grid container ref={dropZonesRef}>
                  {renderDropZones()}
                </Grid>
              </td>
            </tr>
            <tr>
              <td>
                <img src={Noon} alt="noon" className="daytime" />
              </td>
            </tr>
            <tr>
              <td>
                <img src={Evening} alt="evening" className="daytime" />
              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
      <Grid item className={classes.weekChoice}>
        <div>
          <IconButton
            onClick={() => changeSelectedRelativeWeek(selectedRelativeWeek - 1)}
            size="large"
          >
            <ArrowBackIos htmlColor="#fffff"></ArrowBackIos>
          </IconButton>
          {getCurrentWeekText()}
          <IconButton
            onClick={() => changeSelectedRelativeWeek(selectedRelativeWeek + 1)}
            size="large"
          >
            <ArrowForwardIos htmlColor="#fffff"></ArrowForwardIos>
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
};

export default withTranslation()(Schedule);
