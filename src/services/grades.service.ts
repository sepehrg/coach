import HttpService from './http.service';
import { Grade } from '../entities/Grade';

class GradesApi extends HttpService {
  GRADES_API = 'grades';

  getGrades = (): Promise<Grade[]> => {
    return this.get(`${this.GRADES_API}`);
  };
}

export default new GradesApi({});
