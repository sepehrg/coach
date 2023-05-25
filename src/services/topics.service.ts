import HttpService from './http.service';
import { School } from '../entities';
import { CreateTopicRequest, Topic } from '../entities/Topic';

class TopicsApi extends HttpService {
  TOPIC_API = 'topics';

  getTopics = (): Promise<Topic[]> => {
    return this.get(`${this.TOPIC_API}`);
  };

  getTopicsBySubject = (subjectId: string, grade: number): Promise<Topic[]> => {
    return this.get(
      `${this.TOPIC_API}?filter=subject.id||$eq||${subjectId}&filter=minGrade.year||$lte||${grade}&filter=maxGrade.year||$gte||${grade}`,
    );
  };

  createTopic = (topic: CreateTopicRequest): Promise<Topic> => {
    return this.post(`${this.TOPIC_API}`, { ...topic });
  };

  deleteTopic = (topicId: string) => {
    return this.delete(`${this.TOPIC_API}/${topicId}`);
  };

  updateTopic = (topic: Topic): Promise<School> => {
    return this.patch(`${this.TOPIC_API}/${topic.id}`, { ...topic });
  };

  getTopicById = (topicId: string): Promise<Topic> => {
    return this.get(`${this.TOPIC_API}?s={"id":"${topicId}"}`);
  };

  searchTopicByName = (name: string): Promise<Topic[]> => {
    return this.get(`${this.TOPIC_API}?s={"name":{"$cont":"${name}"}}`);
  };
}

export default new TopicsApi({});
