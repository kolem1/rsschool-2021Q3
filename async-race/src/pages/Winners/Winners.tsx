import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWinners, setSortAndOrder, setWinnersPage } from '../../store/actions/winnersActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Container, CarSvg } from '../../components';
import { OrderType, SortType } from '../../types/winners';

export const Winners = () => {
  const { page, winners, total, sort, order } = useTypedSelector((state) => state.winners);
  const dispatch = useDispatch();
  console.log(sort, order);

  const winnersLimit = 10;
  const totalPages = Math.ceil(total / winnersLimit);

  useEffect(() => {
    dispatch(fetchWinners(page, sort, order));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, order]);

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
                <th
                  onClick={() => {
                    let newOrder = OrderType.ASC;
                    if (sort === SortType.id) {
                      newOrder = order === OrderType.ASC ? OrderType.DESC : OrderType.ASC;
                    }
                    dispatch(setSortAndOrder(SortType.id, newOrder));
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Number
                </th>
                <th>Car</th>
                <th>Name</th>
                <th
                  onClick={() => {
                    let newOrder = OrderType.ASC;
                    if (sort === SortType.wins) {
                      newOrder = order === OrderType.ASC ? OrderType.DESC : OrderType.ASC;
                    }
                    dispatch(setSortAndOrder(SortType.wins, newOrder));
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Wins
                </th>
                <th
                  onClick={() => {
                    let newOrder = OrderType.ASC;
                    if (sort === SortType.time) {
                      newOrder = order === OrderType.ASC ? OrderType.DESC : OrderType.ASC;
                    }
                    dispatch(setSortAndOrder(SortType.time, newOrder));
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Best Time (seconds)
                </th>
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
        <div>
          <button
            disabled={page === 1 || total === 0}
            onClick={() => {
              dispatch(setWinnersPage(page - 1));
              dispatch(fetchWinners(page));
            }}
          >
            prev
          </button>
          <button
            disabled={page === totalPages || total === 0}
            onClick={async () => {
              dispatch(setWinnersPage(page + 1));
              dispatch(fetchWinners(page));
            }}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};
