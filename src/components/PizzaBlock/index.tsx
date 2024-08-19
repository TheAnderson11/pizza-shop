import { FC, useState } from 'react';
const TYPES_PROPERTY = ['тонкое', 'традиционное'];
import { useDispatch, useSelector } from 'react-redux';
import { addItems, cartSelectorFindItems } from '../../redux/slices/cartSlice';

type pizzaBlockprop = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}

const PizzaBlock:FC<pizzaBlockprop> = ({ id, title, price, imageUrl, types, sizes }) => {
  const dispatch = useDispatch();
  const counterCart = useSelector(cartSelectorFindItems(id));
  const addedCounter = counterCart ? counterCart.count : 0;
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const onClickAddItems = () => {
    const items = {
      id,
      title,
      price,
      imageUrl,
      type: TYPES_PROPERTY[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItems(items));
  };
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map(typeId => (
            <li
              key={typeId}
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? 'active' : ''}
            >
              {TYPES_PROPERTY[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? 'active' : ''}
            >
              {size + 'cm.'}
            </li>
          ))}
        </ul>
      </div>
      <div onClick={onClickAddItems} className="pizza-block__bottom">
        <div className="pizza-block__price">от {price}$</div>
        <div className="button button--outline button--add">
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
          {addedCounter > 0 && <i>{addedCounter}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
