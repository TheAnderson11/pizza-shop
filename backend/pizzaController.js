import pizzaService from './pizzaService.js';

const pizzaController = () => {
  const postPizza = async (req, res) => {
    try {
      const newPizza = req.body;
      const existingPizza = await pizzaService().onePizza(newPizza.id);
      if (existingPizza) {
        return res.status(409).json({
          error: `Такая пицца уже существует, не верный id: ${existingPizza.id}`,
        });
      }
      const result = await pizzaService().addPizza(newPizza);
      res
        .status(201)
        .json({ message: 'Пицца добавлена', id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong...' });
    }
  };
  const getAllPizzas = async (req, res) => {
    try {
      const pizzas = await pizzaService().allPizzas(req.query);
      res.status(200).json(pizzas);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch pizzas: ${err}` });
    }
  };
  const getOnePizza = async (req, res) => {
    const pizzaId = req.params.id;
    const pizza = await pizzaService().onePizza(pizzaId);
    if (pizza) {
      res.status(200).json(pizza);
    } else {
      res.status(404).json({ error: 'Pizza not found' });
    }
  };
  const deletePizza = async (req, res) => {
    const pizzaId = req.params.id;
    const pizza = await pizzaService().deletePizza(pizzaId);
    if (pizza.deletedCount === 1) {
      res.json({ message: 'Pizza deleted successfully' });
    } else {
      res.status(404).json({ error: 'Pizza not found' });
    }
  };
  const updatePizza = async (req, res) => {
    try {
      const pizzaId = req.params.id;
      const updatePizza = await pizzaService().updatePizza(pizzaId, req.body);
      if (updatePizza.modifiedCount === 0) {
        return res.status(409).json({
          error: `Вы не внесли какие либо изменения`,
        });
      }
      res.status(201).json({ message: 'Пицца обновлена', id: updatePizza });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong...' });
    }
  };
  return { postPizza, getAllPizzas, getOnePizza, deletePizza, updatePizza };
};

export default pizzaController;
