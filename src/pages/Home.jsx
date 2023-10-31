import { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSort } from '../redux/filterSlice';
import { SearchContext } from '../App';

const Home = () => {
  const { sort, category } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const sortHandler = id => {
    dispatch(setSort(id));
  };
  const categoryHandler = id => {
    dispatch(setCategory(id));
  };

  const { search } = useContext(SearchContext);
  const [pagination, setPagination] = useState(1);

  const [isData, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const paginateQuery = `page=${pagination}&limit=4`;
    const categoryQuery = category > 0 ? `category=${category}` : '';
    const sortQuery = `sortBy=${sort.sortProperty.replace('-', '')}`;
    const orderQuery = `order=${
      sort.sortProperty.includes('-') ? 'asc' : 'desc'
    }`;
    const searchQuery = `search=${search ? search : ''}`;
    setIsLoading(true);
    fetch(`https://64aaf2bd0c6d844abedf0487.mockapi.io/items?${paginateQuery}&
		${categoryQuery}&${sortQuery}&${orderQuery}&${searchQuery}`)
      .then(data => data.json())
      .then(json => {
        setIsData(json);
        setIsLoading(false);
      });
  }, [sort.sortProperty, category, pagination, search]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          category={category}
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
      <Pagination paginationHandler={setPagination} />
    </div>
  );
};

export default Home;
