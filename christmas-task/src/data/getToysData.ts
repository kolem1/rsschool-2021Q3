import { Fetcher } from './fetchData';
import { IToy } from '../types';

export default async function getToysData(setState: (data: IToy[]) => void): Promise<void> {
  const jsonUrl = process.env.REACT_APP_TOYS_URL as string;
  const toys = await Fetcher.fetchData<IToy[]>(jsonUrl);
  setState(toys);
}
