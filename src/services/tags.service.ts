import HttpService from './http.service';
import { GetTagsByQueryRequest, PlaceholderTagRequest, Tag } from '../entities/Tag';

class TagsApi extends HttpService {
  TAGS_API = 'tags';

  preSearchTag = (payload: PlaceholderTagRequest) => {
    return this.get<string[]>(
      `${this.TAGS_API}/pre-search?subjectId=${payload.subjectId}&gradeId=${payload.gradeId}`,
    );
  };

  getTagsByQuery = (payload: GetTagsByQueryRequest) => {
    return this.get<Tag[]>(
      `${this.TAGS_API}/search?name=${payload.name}&subjectId=${payload.subjectId}&gradeId=${payload.gradeId}`,
    );
  };
}

export default new TagsApi({});
