import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { TaskCreateRequest, TaskEditRequest, TaskDto, TaskType } from 'entities/Task';
import {
  clearSelected,
  createTaskRequest,
  deleteTaskRequest,
  editTaskRequest,
  getTaskRequest,
  getTasksRequest,
  getUpcomingByTypeRequest,
  getUpcomingExamsRequest,
  selectTask,
} from 'store/tasks/tasks.actions';

export const useTasksActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      getTasks: (relativeWeek: number) => {
        dispatch(getTasksRequest(relativeWeek));
      },
      get: (taskId: string) => {
        dispatch(getTaskRequest(taskId));
      },
      getUpcomingExams: () => {
        dispatch(getUpcomingExamsRequest());
      },
      select: (task: TaskDto) => {
        dispatch(selectTask(task));
      },
      create: (task: TaskCreateRequest) => {
        dispatch(createTaskRequest(task));
      },
      edit: (task: TaskEditRequest) => {
        dispatch(editTaskRequest(task));
      },
      delete: (taskId: string, taskType: TaskType) => {
        dispatch(deleteTaskRequest(taskId, taskType));
      },
      clear: () => {
        dispatch(clearSelected());
      },
      getUpcomingByType: (type: TaskType) => {
        dispatch(getUpcomingByTypeRequest(type));
      },
    }),
    [dispatch],
  );
};
