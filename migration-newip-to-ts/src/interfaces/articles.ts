import IArticle from './article';

export default interface IArticles {
  status: string;
  articles?: IArticle[];
}
