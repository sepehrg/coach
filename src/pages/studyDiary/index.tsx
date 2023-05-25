import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';
import { TaskCreateRequest, TaskDto, TaskEditRequest, TaskType } from 'entities/Task';
import useStyles from './StudyDiary.styles';
import AddHomeworkModal from './components/AddHomeworkModal';
import HamburgerMenu from 'components/layout/Header/components/HamburgerMenu';
import Upcoming from './components/Upcoming';
import Schedule from './components/Schedule';
import CalendarProgress from './components/CalendarProgress';
import { useTasksActions } from 'store/tasks';
import { tasksSelector } from 'store/tasks/tasks.selectors';
import { useSelector } from 'react-redux';
import { useSubjectsActions } from 'store/subjects';
import { subjectsDataSelector } from 'store/subjects/subjects.selectors';
import Ido3D from 'components/narrative-design/Ido3D/Scene3D';
import { idoScenes } from 'components/narrative-design/Ido3D/Scene3D/SceneStateManager';
import { profileSelector } from 'store/auth/auth.selectors';
import { Subject } from 'entities/Subject';
import { isEmpty } from 'lodash-es';
import TaskTypeModal from './components/TaskTypeModal';
import UpcomingTasksModal from './components/UpcomingTasksModal';
import moment from 'moment';
import { CalendarIcon, IdoIcon } from 'assets/images/icons';
import { Family, Friends, TimeForMyself } from 'assets/images';

type ModalType = TaskType | null;

export interface TaskTypeData {
  title: string;
  taskType: TaskType;
  icon: string;
}

export const taskTypesDatas: TaskTypeData[] = [
  {
    title: 'Exam',
    taskType: TaskType.EXAM,
    icon: CalendarIcon,
  },
  {
    title: 'Ido',
    taskType: TaskType.IDO,
    icon: IdoIcon,
  },
  {
    title: 'Family',
    taskType: TaskType.FAMILY,
    icon: Family,
  },
  {
    title: 'Friends',
    taskType: TaskType.FRIENDS,
    icon: Friends,
  },
  {
    title: 'Time for myself',
    taskType: TaskType.TIME_FOR_MYSELF,
    icon: TimeForMyself,
  },
];

// Study Diary flow
const StudyDiary: React.FC<WithTranslation> = ({ t }) => {
  const dayHours = [8, 12, 16];
  const { classes } = useStyles();
  const { create, edit, clear, getTasks, getUpcomingExams, select, getUpcomingByType } =
    useTasksActions();
  const { data: tasks, refresh, upcomimgExams, upcomingByType } = useSelector(tasksSelector);
  const { get: getSubjects } = useSubjectsActions();
  const subjects = useSelector(subjectsDataSelector);
  const profile = useSelector(profileSelector);

  const [modal, setModal] = useState<ModalType>(null);
  const [upcomingTasksByTypeModalType, setUpcomingTasksByTypeModalType] = useState<TaskType | null>(
    null,
  );
  const [taskTypeModalOpen, setTaskTypeModalOpen] = useState<boolean>(false);
  const [elementId, setElementId] = useState<string>('');
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [showTaskTypes, setShowTaskTypes] = useState<boolean>(true);
  const [relativeWeek, setRelativeWeek] = useState<number>(0);

  useEffect(() => {
    getTasks(relativeWeek);
  }, [getTasks, refresh, relativeWeek]);

  useEffect(() => {
    getUpcomingExams();
  }, [getUpcomingExams, refresh]);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  useEffect(() => {
    if (!isEmpty(subjects))
      setFilteredSubjects(
        subjects
          .filter((subject) => (profile?.native ? subject.native : subject.nonnative))
          .map((subject) => ({ ...subject, name: t(`Study.Subjects.${subject.name}`) })),
      );
  }, [subjects, profile, t]);

  const openModalHandler = (elementId: string, task?: TaskDto, numberOfTasks?: number) => {
    if (task && task.type === TaskType.EXAM) {
      select(task);
      setModal(task.type);
      setShowTaskTypes(false);
      return;
    }
    if (elementId) setElementId(elementId);
    if (task && numberOfTasks) {
      select(task);
      if (numberOfTasks < 2) setShowTaskTypes(true);
      else setShowTaskTypes(false);
      if (task.type !== TaskType.IDO) {
        setModal(task.type);
      } else {
        setTaskTypeModalOpen(true);
      }
    } else {
      setTaskTypeModalOpen(true);
      setShowTaskTypes(true);
    }
  };

  const openUpcomingTasksByType = (taskType: TaskType) => {
    getUpcomingByType(taskType);
    setUpcomingTasksByTypeModalType(taskType);
  };

  const createIdoTask = (elementId: string) => {
    if (elementId.split('-')?.length > 0) {
      create({
        title: 'Ido',
        startDate: moment.utc(elementId).toDate(),
        recurringType: 'Once',
        subjectId: filteredSubjects[0]?.id,
        details: 'Focus time',
        type: TaskType.IDO,
        isFullDayEvent: false,
      });
    }
  };

  const closeModalHandler = (openTaskType?: boolean) => {
    setModal(null);
    openTaskType ? setTaskTypeModalOpen(true) : clear();
  };

  const createHandler = (data: TaskCreateRequest) => {
    create(data);
    setModal(null);
  };

  const editHandler = (data: TaskEditRequest) => {
    edit(data);
    setModal(null);
  };

  const taskTypeSelectHandler = (taskType: TaskType) => {
    if (taskType === TaskType.IDO) createIdoTask(elementId);
    else setModal(taskType);

    setTaskTypeModalOpen(false);
  };

  const taskTypeCloseHandler = () => {
    setTaskTypeModalOpen(false);
    clear();
  };

  return (
    <>
      <Grid container>
        <Ido3D scene={idoScenes.CALENDER} />
        <Grid item>
          <Grid container className={classes.root}>
            <Grid item className={classes.column}>
              <HamburgerMenu />
            </Grid>
            <Grid item>
              <Grid container className={classes.ido}>
                <Grid item container>
                  <Grid item className={classes.upcoming}>
                    <Upcoming onTaskSelect={openModalHandler} tasks={upcomimgExams} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className={classes.wrapper}>
            <Grid item>
              <Grid container className={classes.diary}>
                <Grid item>
                  <Grid container className={classes.diaryContent}>
                    <Grid item>
                      <Schedule
                        onOpenModal={openModalHandler}
                        openUpcomingTasksByType={openUpcomingTasksByType}
                        tasks={tasks}
                        dayHours={dayHours}
                        taskTypesDatas={taskTypesDatas}
                        onSelectedRelativeWeekChange={(relativeWeek) =>
                          setRelativeWeek(relativeWeek)
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.side}>
              <CalendarProgress tasks={tasks} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {modal && (
        <AddHomeworkModal
          onClose={closeModalHandler}
          onCreate={createHandler}
          onEdit={editHandler}
          isOpen={true}
          type={modal}
          elementId={elementId}
          taskTypesDatas={taskTypesDatas}
        />
      )}
      <TaskTypeModal
        isOpen={taskTypeModalOpen}
        onClose={taskTypeCloseHandler}
        onTaskTypeSelect={taskTypeSelectHandler}
        showTaskTypes={showTaskTypes}
        taskTypesDatas={taskTypesDatas}
      />
      <UpcomingTasksModal
        isOpen={!!upcomingTasksByTypeModalType}
        tasks={upcomingByType[upcomingTasksByTypeModalType as unknown as number] ?? []}
        onClose={() => setUpcomingTasksByTypeModalType(null)}
        dayHours={dayHours}
        taskType={upcomingTasksByTypeModalType ?? TaskType.FAMILY}
        taskTypesDatas={taskTypesDatas}
      ></UpcomingTasksModal>
    </>
  );
};

export default withTranslation()(StudyDiary);
