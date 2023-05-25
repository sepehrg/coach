import { Task, TaskCreateRequest, TaskDto, TaskEditRequest, TaskType } from 'entities/Task';

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASK_REQUEST = 'GET_TASK_REQUEST';
export const GET_TASK_SUCCESS = 'GET_TASK_SUCCESS';
export const GET_UPCOMING_EXAMS_REQUEST = 'GET_UPCOMING_EXAMS_REQUEST';
export const GET_UPCOMING_EXAMS_SUCCESS = 'GET_UPCOMING_EXAMS_SUCCESS';
export const GET_UPCOMING_BY_TYPE_REQUEST = 'GET_UPCOMING_BY_TYPE_REQUEST';
export const GET_UPCOMING_BY_TYPE_SUCCESS = 'GET_UPCOMING_BY_TYPE_SUCCESS';
export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const EDIT_TASK_REQUEST = 'EDIT_TASK_REQUEST';
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const SELECT_TASK = 'SELECT_TASK';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';

export interface TasksState {
  data: TaskDto[];
  upcomimgExams: Task[];
  upcomingByType: { [type: string]: TaskDto[] };
  selectedItem: TaskDto | null;
  refresh: boolean;
}

export interface GetTasksRequest {
  type: typeof GET_TASKS_REQUEST;
  relativeWeek: number;
}

export interface GetTasksSuccess {
  type: typeof GET_TASKS_SUCCESS;
  payload: TaskDto[];
}

export interface GetTaskRequest {
  type: typeof GET_TASK_REQUEST;
  payload: string;
}

export interface GetTaskSuccess {
  type: typeof GET_TASK_SUCCESS;
  payload: Task;
}

export interface CreateTaskRequest {
  type: typeof CREATE_TASK_REQUEST;
  payload: TaskCreateRequest;
}

export interface CreateTaskSuccess {
  type: typeof CREATE_TASK_SUCCESS;
  payload: Task;
}

export interface EditTaskRequest {
  type: typeof EDIT_TASK_REQUEST;
  payload: TaskEditRequest;
}

export interface EditTaskSuccess {
  type: typeof EDIT_TASK_SUCCESS;
  payload: Task;
}

export interface DeleteTaskRequest {
  type: typeof DELETE_TASK_REQUEST;
  id: string;
  taskType: TaskType;
}

export interface DeleteTaskSuccess {
  type: typeof DELETE_TASK_SUCCESS;
  id: string;
  taskType: TaskType;
}

export interface SelectTask {
  type: typeof SELECT_TASK;
  payload: TaskDto;
}

export interface GetUpcomingExamsRequest {
  type: typeof GET_UPCOMING_EXAMS_REQUEST;
}

export interface GetUpcomingExamsSuccess {
  type: typeof GET_UPCOMING_EXAMS_SUCCESS;
  payload: Task[];
}

export interface GetUpcomingByTypeRequest {
  type: typeof GET_UPCOMING_BY_TYPE_REQUEST;
  taskType: TaskType;
}

export interface GetUpcomingByTypeSuccess {
  type: typeof GET_UPCOMING_BY_TYPE_SUCCESS;
  taskType: TaskType;
  tasks: TaskDto[];
}

export interface ClearSelected {
  type: typeof CLEAR_SELECTED;
}

export type TasksActionTypes =
  | GetTasksRequest
  | GetTasksSuccess
  | GetTaskRequest
  | GetTaskSuccess
  | GetUpcomingExamsRequest
  | GetUpcomingExamsSuccess
  | GetUpcomingByTypeRequest
  | GetUpcomingByTypeSuccess
  | CreateTaskRequest
  | CreateTaskSuccess
  | EditTaskRequest
  | EditTaskSuccess
  | DeleteTaskRequest
  | DeleteTaskSuccess
  | SelectTask
  | ClearSelected;
