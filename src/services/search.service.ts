import HttpService from './http.service';

class SearchApi extends HttpService {
  SEARCH_API = 'search';

  searchSubjectAndTopics = (query: string) => {
    return this.get(`${this.SEARCH_API}/?query=${query}`);
  };
}

export default new SearchApi({});
