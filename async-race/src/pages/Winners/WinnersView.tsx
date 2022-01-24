import { memo, FC } from 'react';
import { CarSvg, Page, PageTitle, PageCounter } from '../../components';
import { IWinnerView, OrderType, SortType } from '../../types/winners';
import { Pagination } from './../../components/Pagination/Pagination';
import styles from './Winners.module.css';

interface IWinnersViewProps {
  page: number;
  total: number;
  totalPages: number;
  sort: SortType;
  handleNumberClick: () => void;
  handleWinsClick: () => void;
  handleTimeClick: () => void;
  order: OrderType;
  winners: IWinnerView[];
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
}

const WinnersViewComponnent: FC<IWinnersViewProps> = ({
  page,
  total,
  totalPages,
  sort,
  handleNumberClick,
  handleWinsClick,
  handleTimeClick,
  order,
  winners,
  onNextPageClick,
  onPrevPageClick
}) => {
  return (
    <Page>
      <PageTitle>Winners ({total})</PageTitle>
      <PageCounter>
        Page {page} {totalPages > 1 && `of ${totalPages}`}
      </PageCounter>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <button
                  className={styles.button}
                  disabled={sort === SortType.id}
                  onClick={handleNumberClick}
                >
                  Number
                </button>
              </th>
              <th>Car</th>
              <th>Name</th>
              <th className={styles.winsCol}>
                <button className={styles.button} onClick={handleWinsClick}>
                  Wins {sort === SortType.wins && (order === OrderType.ASC ? '↑' : '↓')}
                </button>
              </th>
              <th className={styles.timeCol}>
                <button className={styles.button} onClick={handleTimeClick}>
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
        handleNextClick={onNextPageClick}
        handlePrevClick={onPrevPageClick}
      />
    </Page>
  );
};

export const WinnersView = memo(WinnersViewComponnent);
