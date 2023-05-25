import HttpService from './http.service';
import { IdoResponse } from 'entities/IdoResponse';
import { IdoAction, IdoActionRequest } from 'entities/Ido';

class IdoActionApi extends HttpService {
  IDO_ACTION_API = 'ido-action';

  greeting = (): Promise<IdoResponse> => {
    return this.get(`${this.IDO_ACTION_API}/greeting`);
  };

  affirmation = (): Promise<IdoResponse> => {
    return this.get(`${this.IDO_ACTION_API}/affirmation`);
  };

  motivation = (): Promise<IdoResponse> => {
    return this.get(`${this.IDO_ACTION_API}/motivation`);
  };

  reminder = (): Promise<IdoResponse> => {
    return this.get(`${this.IDO_ACTION_API}/reminder`);
  };

  subjectAdvice = (subjectId: string): Promise<IdoResponse> => {
    return this.get(`${this.IDO_ACTION_API}/subject-advice/${subjectId}`);
  };

  focustimeTip = (): Promise<IdoResponse> => {
    return this.get(`${this.IDO_ACTION_API}/focustime-tip`);
  };

  getAction = (request: IdoActionRequest): Promise<IdoAction> => {
    return this.post(`${this.IDO_ACTION_API}`, request);
  };
}

export default new IdoActionApi({});
