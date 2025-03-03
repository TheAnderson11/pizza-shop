import express from 'express';
import cors from 'cors';
import router from './router.js';
import mongoose from 'mongoose';

const PORT = 3003;
const URL = 'mongodb://localhost:27017/pizzaBox';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/pizzas', router);

const serverStart = () => {
  try {
    mongoose.connect(URL).then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    });
  } catch (error) {
    throw new Error('Failed to start server');
  }
};

serverStart();
