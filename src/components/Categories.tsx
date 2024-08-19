import { FC } from "react";

const CATEGORY_LIST = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

type categoriesProp = {
  category: number;
  onCategoryClick: any;
}

const Categories:FC<categoriesProp> = ({ category, onCategoryClick }) => {
  return (
    <div className="categories">
      <ul>
        {CATEGORY_LIST.map((value, i) => (
          <li
            onClick={() => onCategoryClick(i)}
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
