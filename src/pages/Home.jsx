import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [isData, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('https://64aaf2bd0c6d844abedf0487.mockapi.io/items')
      .then(data => data.json())
      .then(json => {
        setIsData(json);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, id) => <Skeleton key={id} />)
          : isData.map(obj => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
