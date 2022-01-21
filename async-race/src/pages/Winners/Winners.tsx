import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWinners } from '../../store/actions/winnersActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Container, CarSvg } from '../../components';

export const Winners = () => {
  const { page, winners, total } = useTypedSelector((state) => state.winners);
  const dispatch = useDispatch();
  console.log(winners);

  const winnersLimit = 10;
  const totalPages = Math.ceil(total / winnersLimit);

  useEffect(() => {
    dispatch(fetchWinners(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <Container>
        <h1>Winners ({total})</h1>
        <h2>
          Page {page} {totalPages > 1 && `from ${totalPages}`}
        </h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Car</th>
                <th>Name</th>
                <th>Wins</th>
                <th>Best Time (seconds)</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, i) => (
                <tr key={winner.id}>
                  <td>{i + 1}</td>
                  <td>
                    <CarSvg color={winner.color} />
                  </td>
                  <td>{winner.name}</td>
                  <td>{winner.wins}</td>
                  <td>{winner.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};
