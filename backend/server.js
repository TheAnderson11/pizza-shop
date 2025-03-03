const express = require('express');
const { connectToDb, getDb } = require('./db.js');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const PORT = 3003;

const app = express();
app.use(cors());
app.use(express.json());
let db;

connectToDb(err => {
  if (!err) {
    db = getDb();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } else {
    console.log(`DB connection errpr: ${err}`);
  }
});

app.post('/pizzas', async (req, res) => {
  try {
    const newPizza = req.body;

    const existingPizza = await db
      .collection('pizzas')
      .findOne({ id: newPizza.id });

    if (existingPizza) {
      return res.status(409).json({
        error: `Такая пицца уже существует, не верный id: ${existingPizza.id}`,
      });
    }

    const result = await db.collection('pizzas').insertOne(newPizza);

    res.status(201).json({ message: 'Пицца добавлена', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong...' });
  }
});

app.get('/pizzas', async (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database not connected' });
  }
  try {
    const { category, sort, order, search, limit, page } = req.query;

    let filter = {};
    if (category) {
      filter.category = category; // Фильтр по категории
    }
    if (search) {
      filter.title = new RegExp(search, 'i'); // Поиск по названию (регистронезависимый)
    }

    let sortOptions = {};
    if (sort) {
      sortOptions[sort] = order === 'desc' ? -1 : 1; // Сортировка по параметру
    }

    const pageNum = parseInt(page) || 1; // Номер страницы
    const limitNum = parseInt(limit) || 10; // Количество элементов на странице
    const skipNum = (pageNum - 1) * limitNum; // Сколько пропустить

    const pizzasData = await db
      .collection('pizzas')
      .find(filter) // Применяем фильтрацию
      .sort(sortOptions) // Применяем сортировку
      .skip(skipNum) // Пропускаем нужное кол-во элементов
      .limit(limitNum) // Ограничиваем кол-во элементов
      .toArray();

    res.status(200).json(pizzasData);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong...' });
  }
});

app.get('/pizzas/:id', async (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database not connected' });
  }

  try {
    const pizzaId = req.params.id;
    const onePizza = await db.collection('pizzas').findOne({ id: pizzaId });

    if (onePizza) {
      res.json(onePizza);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong...' });
  }
});

app.delete('/pizzas/:id', async (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database not connected' });
  }
  try {
    const pizzaId = req.params.id;
    const result = await db.collection('pizzas').deleteOne({ id: pizzaId });
    if (result.deletedCount === 1) {
      res.json({ message: 'Pizza deleted successfully' });
    } else {
      res.status(404).json({ error: 'Pizza not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong...' });
  }
});

app.patch('/pizzas/:id', async (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database not connected' });
  }
  try {
    const pizzaId = req.params.id;
    await db
      .collection('pizzas')
      .updateOne({ id: pizzaId }, { $set: req.body })
      .then(result => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong...' });
  }
});
