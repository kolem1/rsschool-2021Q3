import { EngineResponse, IDrivedEngine, IEngine } from '../types/cars';

const engineAction = async <T extends EngineResponse>(
  id: number,
  status: 'started' | 'stopped' | 'drive'
): Promise<T> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/engine?id=${id}&status=${status}`,
    {
      method: 'PATCH'
    }
  );
  const engine = (await response.json()) as Promise<T>;
  return engine;
};

export const startEngine = async (id: number) => {
  return engineAction<IEngine>(id, 'started');
};

export const stopEngine = async (id: number) => {
  return engineAction<IEngine>(id, 'stopped');
};

export const driveEngine = async (id: number) => {
  return engineAction<IDrivedEngine>(id, 'drive');
};
