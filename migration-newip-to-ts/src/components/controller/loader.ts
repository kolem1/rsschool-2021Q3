import APIResponse from './../../types/apiResponse';
import Callback from '../../types/callback';
import Method from '../../types/method';
import IAPIOptions from '../../interfaces/apiOptions';
import IRequest from '../../interfaces/request';
import IRequestOptions from './../../interfaces/requestOptions';

class Loader {
  constructor(private baseLink: string, private options: IAPIOptions) {}

  getResp(
    { endpoint, options = {} }: IRequest,
    callback: Callback = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: IRequestOptions, endpoint: string) {
    const urlOptions: { [prop: string]: string } = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: Method, endpoint: string, callback: Callback, options: IRequestOptions = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler.bind(this))
      .then((res: Response) => res.json() as Promise<APIResponse>)
      .then((data: APIResponse) => {
        console.log(data);
        callback(data);
      })
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
