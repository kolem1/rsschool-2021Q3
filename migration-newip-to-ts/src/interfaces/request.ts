import IRequestOptions from './requestOptions';

export default interface IRequest {
  endpoint: string;
  options?: IRequestOptions;
}
