import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import fakeData from './assets/dataPizzas.json';
import './scss/app.scss';

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {fakeData.map(obj => (
              <PizzaBlock
                {...obj}
                key={obj.id}
              /> /*Деструктуризацией передаем в компонент все данные ...obj */
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
