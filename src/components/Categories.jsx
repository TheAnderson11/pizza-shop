const CATEGORY_LIST = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories = ({ category, onCategoryClick }) => {
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
