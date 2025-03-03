import Pizzas from './pizzaSchema.js';

const pizzaService = () => {
  const addPizza = async newPizza => {
    try {
      const result = await Pizzas.create(newPizza);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to add pizza');
    }
  };
  const allPizzas = async query => {
    try {
      const { category, sortBy, order, search, limit, page } = query;

      // Фильтрация
      let filter = {};
      if (category > 0) {
        filter.category = category;
      }
      if (search) {
        filter.title = new RegExp(search, 'i');
      }

      // Сортировка
      let sortOptions = {};
      if (sortBy) {
        sortOptions[sortBy] = order === 'desc' ? -1 : 1; // Правильная установка сортировки
      }

      // Пагинация
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 10;
      const skipNum = (pageNum - 1) * limitNum;

      const pizzas = await Pizzas.find(filter)
        .sort(sortOptions)
        .skip(skipNum)
        .limit(limitNum);
      console.log(query);
      return pizzas;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch pizzas');
    }
  };
  const onePizza = async id => {
    try {
      const pizzaId = await Pizzas.findOne({ id: id });

      return pizzaId;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch pizzas');
    }
  };
  const deletePizza = async id => {
    try {
      const pizzaId = await Pizzas.deleteOne({ id: id });

      return pizzaId;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch pizzas');
    }
  };
  const updatePizza = async (id, data) => {
    try {
      const pizzaUpdateId = await Pizzas.updateOne({ id: id }, { $set: data });
      if (pizzaUpdateId.matchedCount === 0) {
        throw new Error('Пицца не найдена');
      }
      return pizzaUpdateId;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch pizzas');
    }
  };
  return { addPizza, allPizzas, onePizza, deletePizza, updatePizza };
};

export default pizzaService;
