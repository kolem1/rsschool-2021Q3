import { IWinner } from '../types/winners';

export const setWinner = async (id: number, time: number) => {
  const winners = await fetch(`${process.env.REACT_APP_API_URL}/winners`).then(
    (result) => result.json() as Promise<IWinner[]>
  );
  const winner = winners.find((car) => car.id === id);
  if (winner) {
    await fetch(`${process.env.REACT_APP_API_URL}/winners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wins: winner.wins + 1, time: Math.min(winner.time, time) })
    });
  } else {
    await fetch(`${process.env.REACT_APP_API_URL}/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, wins: 1, time })
    });
  }
};
