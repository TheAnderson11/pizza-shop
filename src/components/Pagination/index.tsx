import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { FC } from 'react';

type paginationProp = {
  state: number;
  paginationHandler: any;
}

const Pagination:FC<paginationProp> = ({ state, paginationHandler }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={4}
      pageCount={3}
      onPageChange={e => paginationHandler(e.selected + 1)}
      forcePage={state - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
