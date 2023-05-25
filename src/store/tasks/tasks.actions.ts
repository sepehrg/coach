import {
  CLEAR_SELECTED,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  EDIT_TASK_REQUEST,
  EDIT_TASK_SUCCESS,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_UPCOMING_BY_TYPE_REQUEST,
  GET_UPCOMING_BY_TYPE_SUCCESS,
  GET_UPCOMING_EXAMS_REQUEST,
  GET_UPCOMING_EXAMS_SUCCESS,
  SELECT_TASK,
  TasksActionTypes,
} from 'store/tasks/tasks.types';
import { Task, TaskCreateRequest, TaskDto, TaskEditRequest, TaskType } from 'entities/Task';

export const getTasksRequest = (relativeWeek: number): TasksActionTypes => ({
  type: GET_TASKS_REQUEST,
  relativeWeek,
});

export const getTasksSuccess = (payload: TaskDto[]): TasksActionTypes => ({
  type: GET_TASKS_SUCCESS,
  payload,
});

export const getTaskRequest = (payload: string): TasksActionTypes => ({
  type: GET_TASK_REQUEST,
  payload,
});

export const getTaskSuccess = (payload: Task): TasksActionTypes => ({
  type: GET_TASK_SUCCESS,
  payload,
});

export const createTaskRequest = (payload: TaskCreateRequest): TasksActionTypes => ({
  type: CREATE_TASK_REQUEST,
  payload,
});

export const getUpcomingExamsRequest = (): TasksActionTypes => ({
  type: GET_UPCOMING_EXAMS_REQUEST,
});

export const getUpcomingExamsSuccess = (payload: Task[]): TasksActionTypes => ({
  type: GET_UPCOMING_EXAMS_SUCCESS,
  payload,
});

export const getUpcomingByTypeRequest = (taskType: TaskType): TasksActionTypes => ({
  type: GET_UPCOMING_BY_TYPE_REQUEST,
  taskType,
});

export const getUpcomingByTypeSuccess = (
  tasks: TaskDto[],
  taskType: TaskType,
): TasksActionTypes => ({
  type: GET_UPCOMING_BY_TYPE_SUCCESS,
  tasks,
  taskType,
});

export const createTaskSuccess = (payload: Task): TasksActionTypes => ({
  type: CREATE_TASK_SUCCESS,
  payload,
});

export const editTaskRequest = (payload: TaskEditRequest): TasksActionTypes => ({
  type: EDIT_TASK_REQUEST,
  payload,
});

export const editTaskSuccess = (payload: Task): TasksActionTypes => ({
  type: EDIT_TASK_SUCCESS,
  payload,
});

export const deleteTaskRequest = (id: string, taskType: TaskType): TasksActionTypes => ({
  type: DELETE_TASK_REQUEST,
  id,
  taskType,
});

export const deleteTaskSuccess = (id: string, taskType: TaskType): TasksActionTypes => ({
  type: DELETE_TASK_SUCCESS,
  id,
  taskType,
});

export const selectTask = (payload: TaskDto): TasksActionTypes => ({
  type: SELECT_TASK,
  payload,
});

export const clearSelected = (): TasksActionTypes => ({
  type: CLEAR_SELECTED,
});
