import { Fetcher } from './fetchData';
import { IToy } from '../types';

export default async function getToysData(setState: (data: IToy[]) => void): Promise<void> {
  const jsonUrl = `${process.env.PUBLIC_URL}/data.json`;
  const toys = await Fetcher.fetchData<IToy[]>(jsonUrl);
  setState(toys);
}
