import ISource from "./source";

export default interface IArticle {
  author: string;
  title: string;
  publishedAt: string;
  description: string;
  url: string;
  source: ISource;
}