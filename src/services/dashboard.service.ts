import HttpService from './http.service';
import { RecentlyActiveStudent, StudyProgressPayload } from '../entities/Student';
import { StudyProgressResponse } from '../entities/Dashboard';

class DashboardApi extends HttpService {
  DASHBOARD_API = 'dashboard';

  getClassmates = (): Promise<RecentlyActiveStudent[]> => {
    return this.get(`${this.DASHBOARD_API}/recently-active`);
  };

  getStatistics = (payload: StudyProgressPayload): Promise<StudyProgressResponse> => {
    return this.get(
      `${this.DASHBOARD_API}?startDate=${payload.startDate}&endDate=${payload.endDate}`,
    );
  };
}

export default new DashboardApi({});
