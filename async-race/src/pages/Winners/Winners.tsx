import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWinners, setSortAndOrder, setWinnersPage } from '../../store/actions/winnersActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { OrderType, SortType } from '../../types/winners';
import { WinnersView } from './WinnersView';

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
    <WinnersView
      page={page}
      total={total}
      totalPages={totalPages}
      sort={sort}
      order={order}
      winners={winners}
      handleNumberClick={() => {
        dispatch(setSortAndOrder(SortType.id, OrderType.ASC));
      }}
      handleWinsClick={() => {
        let newOrder = OrderType.ASC;
        if (sort === SortType.wins) {
          newOrder = order === OrderType.ASC ? OrderType.DESC : OrderType.ASC;
        }
        dispatch(setSortAndOrder(SortType.wins, newOrder));
      }}
      handleTimeClick={() => {
        let newOrder = OrderType.ASC;
        if (sort === SortType.time) {
          newOrder = order === OrderType.ASC ? OrderType.DESC : OrderType.ASC;
        }
        dispatch(setSortAndOrder(SortType.time, newOrder));
      }}
      onNextPageClick={() => {
        dispatch(setWinnersPage(page + 1));
      }}
      onPrevPageClick={() => {
        dispatch(setWinnersPage(page - 1));
      }}
    />
  );
};
