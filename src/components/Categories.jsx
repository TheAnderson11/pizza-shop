import { useState } from 'react';

const CATEGORY_LIST = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];
const Categories = () => {
  const [category, setCategory] = useState(0);
  return (
    <div className="categories">
      <ul>
        {CATEGORY_LIST.map((value, i) => (
          <li
            onClick={() => setCategory(i)}
            className={category === i ? 'active' : ''}
            key={i}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
