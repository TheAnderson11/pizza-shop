import React, { useState } from 'react';
const TYPES_PROPERTY = ['тонкое', 'традиционное']; /* значения */

const PizzaBlock = ({ title, price, imageUrl, types, sizes }) => {
  const [counter, setCounter] = useState(0);
  const [type, setType] =
    useState(
      0,
    ); /* Создаём состояние для того чтобы записывать в него index элемента на который мы будем нажимать */
  const [size, setSize] = useState(0); /* тоже самое */

  const counterHandler = e => {
    setCounter(counter + 1);
    e.preventDefault();
  };
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((value, i /* Проходимся по массиву */) => (
            <li
              key={i}
              onClick={() =>
                setType(i)
              } /*по клику передаём в состояние выбранный индекс*/
              className={
                type === value ? 'active' : ''
              } /*переданый в состояние индекс сравниваем с значением*/
            >
              {TYPES_PROPERTY[value]}
              {/*отрисовуем ранее созданное значения переменной, и присваеваем значение индексу выбраного типа*/}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((value, i /* Проходимся по массиву */) => (
            <li
              key={i}
              onClick={() =>
                setSize(i)
              } /*по клику передаём в состояние выбранный индекс*/
              className={
                size === i ? 'active' : ''
              } /*переданый в состояние индекс сравниваем с индексом*/
            >
              {value + 'cm.'}
              {/*отрисовуем значение*/}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price}$</div>
        <div
          className="button button--outline button--add"
          onClick={e => counterHandler(e)}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{counter}</i>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
