const express = require('express');
const { connectToDb, getDb } = require('./db.js');
const cors = require('cors');
const PORT = 3003;

const app = express();
app.use(cors());
let db;

connectToDb(err => {
  if (!err) {
    db = getDb();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } else {
    console.log(`DB connection errpr: ${err}`);
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
    const pizzasData = await db.collection('pizzas').find().toArray();
    const onePizza = pizzasData.find(item => item.id === pizzaId);

    if (onePizza) {
      res.json(onePizza);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong...' });
  }
});
