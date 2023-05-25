import HttpService from './http.service';
import { School } from 'entities';
import { CreateSchoolRequest } from 'entities/School';

class SchoolsApi extends HttpService {
  SCHOOL_API = 'schools';

  getSchools = (): Promise<School[]> => {
    return this.get(`${this.SCHOOL_API}`);
  };

  createSchool = (school: CreateSchoolRequest): Promise<School> => {
    return this.post(`${this.SCHOOL_API}`, { ...school });
  };

  deleteSchool = (schoolId: string) => {
    return this.delete(`${this.SCHOOL_API}/${schoolId}`);
  };

  updateSchool = (school: School): Promise<School> => {
    return this.patch(`${this.SCHOOL_API}/${school.id}`, { ...school });
  };
}

export default new SchoolsApi({});
