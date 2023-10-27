import React from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import dataPizzas from '../assets/dataPizzas.json';

const Home = () => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {dataPizzas.map(obj => (
          <PizzaBlock {...obj} key={obj.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
