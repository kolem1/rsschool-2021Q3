import ISource from './source';

export default interface ISources {
  status: string;
  sources?: ISource[];
}
