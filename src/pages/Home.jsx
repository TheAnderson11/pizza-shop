import { useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { SORT_LIST } from '../components/Sort';
import { useDispatch, useSelector } from 'react-redux';
import QueryString from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import {
  filterSelector,
  setCategory,
  setFilters,
  setPaginationCount,
  setSort,
} from '../redux/slices/filterSlice';
import { axiosReqPizzas, pizzaSelector } from '../redux/slices/pizzaSlice';

const Home = () => {
  const { sort, categoryId, search, currentPage } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaSelector);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sortHandler = id => {
    dispatch(setSort(id));
  };
  const categoryHandler = id => {
    dispatch(setCategory(id));
  };

  const paginationHandler = id => {
    dispatch(setPaginationCount(id));
  };

  const axiosPizzas = () => {
    const paginateQuery = `page=${currentPage}&limit=4`;
    const categoryQuery = categoryId > 0 ? `category=${categoryId}` : '';
    const sortQuery = `sortBy=${sort.sortProperty.replace('-', '')}`;
    const orderQuery = `order=${
      sort.sortProperty.includes('-') ? 'asc' : 'desc'
    }`;
    const searchQuery = `search=${search ? search : ''}`;

    dispatch(
      axiosReqPizzas({
        paginateQuery,
        categoryQuery,
        sortQuery,
        orderQuery,
        searchQuery,
      }),
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryParams = QueryString.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryParams}`);
    }
    isMounted.current = true;
  }, [sort.sortProperty, categoryId, currentPage]); //create query params

  useEffect(() => {
    if (window.location.search) {
      const paramsParse = QueryString.parse(
        window.location.search.substring(1),
      );
      const sort = SORT_LIST.find(
        obj => obj.sortProperty == paramsParse.sortProperty,
      );
      dispatch(
        setFilters({
          ...paramsParse,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []); //parse URL params

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      axiosPizzas();
    }
    isSearch.current = false;
  }, [sort.sortProperty, categoryId, currentPage, search]); //request axios on server
  const skeleton = [...new Array(6)].map((_, id) => <Skeleton key={id} />);
  const pizzas = items.map(obj => (
    <Link to={`/pizza/${obj.id}`} key={obj.id}>
      <PizzaBlock {...obj} />
    </Link>
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          category={categoryId}
          onCategoryClick={i => categoryHandler(i)}
        />
        <Sort sort={sort} onSortClick={i => sortHandler(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}

      <Pagination state={currentPage} paginationHandler={paginationHandler} />
    </div>
  );
};

export default Home;
