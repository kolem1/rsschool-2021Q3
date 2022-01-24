import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWinners, setSortAndOrder, setWinnersPage } from '../../store/actions/winnersActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CarSvg, Page, PageTitle, PageCounter } from '../../components';
import { OrderType, SortType } from '../../types/winners';
import { Pagination } from './../../components/Pagination/Pagination';
import styles from './Winners.module.css';

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
    <Page>
      <PageTitle>Winners ({total})</PageTitle>
      <PageCounter>
        Page {page} {totalPages > 1 && `from ${totalPages}`}
      </PageCounter>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <button
                  className={styles.button}
                  disabled={sort === SortType.id}
                  onClick={() => {
                    dispatch(setSortAndOrder(SortType.id, OrderType.ASC));
                  }}
                >
                  Number
                </button>
              </th>
              <th>Car</th>
              <th>Name</th>
              <th className={styles.winsCol}>
                <button
                  className={styles.button}
                  onClick={() => {
                    let newOrder = OrderType.ASC;
                    if (sort === SortType.wins) {
                      newOrder = order === OrderType.ASC ? OrderType.DESC : OrderType.ASC;
                    }
                    dispatch(setSortAndOrder(SortType.wins, newOrder));
                  }}
                >
                  Wins {sort === SortType.wins && (order === OrderType.ASC ? '↑' : '↓')}
                </button>
              </th>
              <th className={styles.timeCol}>
                <button
                  className={styles.button}
                  onClick={() => {
                    let newOrder = OrderType.ASC;
                    if (sort === SortType.time) {
                      newOrder = order === OrderType.ASC ? OrderType.DESC : OrderType.ASC;
                    }
                    dispatch(setSortAndOrder(SortType.time, newOrder));
                  }}
                >
                  Best Time (sec)
                  {sort === SortType.time && (order === OrderType.ASC ? '↑' : '↓')}
                </button>
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
      <Pagination
        disabled={{
          prev: page === 1 || total === 0,
          next: page === totalPages || total === 0
        }}
        handleNextClick={() => {
          dispatch(setWinnersPage(page + 1));
        }}
        handlePrevClick={() => {
          dispatch(setWinnersPage(page - 1));
        }}
      />
    </Page>
  );
};
