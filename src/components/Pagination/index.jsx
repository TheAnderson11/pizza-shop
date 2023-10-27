import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = () => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={4}
      pageCount={3}
      onPageChange={e => console.log(e.selected + 1)}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
