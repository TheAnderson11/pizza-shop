import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { SORT_LIST } from '../components/Sort';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategory,
  setFilters,
  setPaginationCount,
  setSort,
} from '../redux/filterSlice';
import axios from 'axios';
import QueryString from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { sort, categoryId, search, currentPage } = useSelector(
    state => state.filter,
  );
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

  const [isData, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    }
  }, []); //parse URL params

  useEffect(() => {
    const paginateQuery = `page=${currentPage}&limit=4`;
    const categoryQuery = categoryId > 0 ? `category=${categoryId}` : '';
    const sortQuery = `sortBy=${sort.sortProperty.replace('-', '')}`;
    const orderQuery = `order=${
      sort.sortProperty.includes('-') ? 'asc' : 'desc'
    }`;
    const searchQuery = `search=${search ? search : ''}`;
    setIsLoading(true);
    axios
      .get(
        `https://64aaf2bd0c6d844abedf0487.mockapi.io/items?${paginateQuery}&
		${categoryQuery}&${sortQuery}&${orderQuery}&${searchQuery}`,
      )
      .then(res => {
        setIsData(res.data);
        setIsLoading(false);
      });
  }, [sort.sortProperty, categoryId, currentPage, search]); //request axios on server

  useEffect(() => {
    const queryParams = QueryString.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryParams}`);
  }, [sort.sortProperty, categoryId, currentPage]); //create query params

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
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, id) => <Skeleton key={id} />)
          : isData.map(obj => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
      <Pagination state={currentPage} paginationHandler={paginationHandler} />
    </div>
  );
};

export default Home;
