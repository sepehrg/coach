import { Student } from 'entities/Student';
import HttpService from './http.service';
import { User } from 'entities';

class UserAPI extends HttpService {
  USER_API = 'users';

  getUsers = (): Promise<User[]> => {
    return this.get(`${this.USER_API}`);
  };

  getStudents = (): Promise<Student[]> => {
    return this.get(`${this.USER_API}?s={"role":"Student"}`);
  };

  getGroupmates = (query: string): Promise<Student[]> => {
    const searchQuery = {
      $and: [
        {
          nickname: {
            $notnull: true,
          },
        },
        {
          $or: [
            {
              name: {
                $contL: query,
              },
            },
            {
              email: {
                $contL: query,
              },
            },
            {
              nickname: {
                $contL: query,
              },
            },
          ],
        },
      ],
    };

    return this.get(`${this.USER_API}?s=${JSON.stringify(searchQuery)}`);
  };

  getByAuthId = (id: string) => {
    return this.get(`user?filters={"authId":"${id}"}`);
  };
}

export default new UserAPI({});
