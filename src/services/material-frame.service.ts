import HttpService from './http.service';

class MaterialFrameApi extends HttpService {
  getIsUrlBlockedForIFrame = (url: string): Promise<boolean> => {
    return fetch('iframe-blocked-check.php?url=' + url)
      .then((response) => response.text())
      .then((boolString) => boolString.toLowerCase() === 'true')
      .catch(() => true);
  };
}

export default new MaterialFrameApi({});
