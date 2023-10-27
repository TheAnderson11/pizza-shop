import React, { useState } from 'react';
const SORT_LIST = ['популярности', 'цене', 'алфавиту'];
const Sort = () => {
  const [popup, setPopup] = useState(false); //Состояние отк/закр окна поп-апа
  const [sort, setSort] = useState(0); //Индекс храним в состояние (выборка элемента)
  const handlerPopup = i => {
    setSort(i);
    setPopup(!popup);
  }; //Функция при выборе из списка данных будет записывать выбранный index элемента и вкл/выкл окно
  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => setPopup(!popup)} //отк/закр окно по клику на имя
        >
          {SORT_LIST[sort]}{' '}
          {/* Рисуем список и передаём index выбраного элемента */}
        </span>
      </div>
      {popup && (
        <div className="sort__popup">
          {' '}
          {/* пока false работает левая сторона */}
          <ul>
            {SORT_LIST.map((value, i) => (
              <li
                onClick={() => handlerPopup(i)} //при клике отрабатывает функция
                className={sort === i ? 'active' : ''} //Если sort совпадает с i будет подсветка active
                key={i}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
