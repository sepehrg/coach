import HttpService from './http.service';
import { Task, TaskCreateRequest, TaskDto, TaskEditRequest, TaskType } from 'entities/Task';

class TasksApi extends HttpService {
  TASKS_API = 'tasks';

  getTasks = (relativeWeek: number): Promise<TaskDto[]> => {
    return this.get(`${this.TASKS_API}/getFlatten?relativeWeek=${relativeWeek}`);
  };

  getTask = (taskId: string): Promise<Task> => {
    return this.get(`${this.TASKS_API}/${taskId}`);
  };

  getUpcomimgExams = (today: Date): Promise<Task[]> => {
    return this.get(
      `${
        this.TASKS_API
      }/?filter=type||$eq||Exam&filter=startDate||$gt||${today.toISOString()}&sort=startDate,ASC`,
    );
  };

  getUpcomingByTypeFlatten = (type: TaskType): Promise<TaskDto[]> => {
    return this.get(`${this.TASKS_API}/getUpcomingByTypeFlatten?type=${type}`);
  };

  createTask = (dto: TaskCreateRequest) => {
    return this.post(`${this.TASKS_API}`, { ...dto });
  };

  deleteTask = (taskId: string) => {
    return this.delete(`${this.TASKS_API}/${taskId}`);
  };

  editTask = (task: TaskEditRequest) => {
    return this.patch(`${this.TASKS_API}/${task.id}`, task);
  };
}

export default new TasksApi({});
