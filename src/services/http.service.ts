import axios, { AxiosResponse, Method } from 'axios';
import config from '../config';
import Cookies from 'universal-cookie';

export interface IRequestParams {
  url: string;
  method?: Method;
  headers?: any;
  data?: any;
  auth?: boolean;
  tokenFromEmail?: string;
}

export interface IHttpConfig {
  apiURL?: string;
  headers?: any;
}

class HttpService {
  client = axios.create();

  config: IHttpConfig = {
    apiURL: config.BACKEND_URL,
    headers: {
      Accept: 'application/json, multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };

  constructor(params: IHttpConfig) {
    this.config = { ...this.config, ...params };
  }

  getHeaders = (headers: any, auth?: boolean, tokenFromEmail?: string): any => {
    const cookies = new Cookies();
    const token = cookies.get('token') || tokenFromEmail;

    const headersObj =
      token && auth ? { ...headers, Authorization: `Bearer ${token}` } : { ...headers };

    return Object.assign({}, this.config.headers, headersObj);
  };

  getURL = (url: string) => {
    return `${this.config.apiURL}/${url}`;
  };

  request = <T>(params: IRequestParams): Promise<T> => {
    const headers = this.getHeaders(params.headers, params.auth, params.tokenFromEmail);
    const url = this.getURL(params.url);

    const requestParams = {
      url,
      headers,
      method: params.method,
      data: params.data,
    };
    // console.log(requestParams);

    return axios.request<T>(requestParams).then((response: AxiosResponse<T>) => response.data);
    // .catch((err: AxiosError) => console.error(err))
  };

  // Since most of requests in the app are student private
  // we make auth = true by default.
  post = <T>(url: string, data?: any, auth = true) => {
    return this.request<T>({ url, data, auth, method: 'post' });
  };

  put = <T>(url: string, data?: any, auth = true) => {
    return this.request<T>({ url, data, auth, method: 'put' });
  };

  patch = <T>(url: string, data?: any, tokenFromEmail?: string, auth = true) => {
    return this.request<T>({ url, data, auth, method: 'patch', tokenFromEmail });
  };

  get = <T>(url: string, data?: any, auth = true) => {
    return this.request<T>({ url, data, auth, method: 'get' });
  };

  delete = <T>(url: string, data?: any, auth = true) => {
    return this.request<T>({ url, data, auth, method: 'delete' });
  };
}

export default HttpService;
