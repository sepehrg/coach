import HttpService from './http.service';
import { CreateSubjectRequest, Subject } from '../entities/Subject';

class SubjectsApi extends HttpService {
  SUBJECTS_API = 'subjects';

  getSubjects = (): Promise<Subject[]> => {
    return this.get(`${this.SUBJECTS_API}`);
  };

  getSubjectById = (subjectId: string): Promise<Subject> => {
    return this.get(`${this.SUBJECTS_API}/${subjectId}`);
  };

  searchByName = (subjectName: string) => {
    return this.get(`${this.SUBJECTS_API}?s={"name":{"$cont":"${subjectName}"}}`);
  };

  createSubject = (subject: CreateSubjectRequest): Promise<Subject> => {
    return this.post(`${this.SUBJECTS_API}`, { ...subject });
  };

  deleteSubject = (subjectId: string) => {
    return this.delete(`${this.SUBJECTS_API}/${subjectId}`);
  };

  updateSubject = (subject: Subject): Promise<Subject> => {
    return this.patch(`${this.SUBJECTS_API}/${subject.id}`, { ...subject });
  };

  createSuggested = (formData: FormData) => {
    return this.post('suggested-subjects', formData);
  };

  updateMySubjects = (subjects: { id: string }[]) => {
    return this.patch('profile', { subjects });
  };
}

export default new SubjectsApi({});
