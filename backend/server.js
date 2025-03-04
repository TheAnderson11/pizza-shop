import express from 'express';
import cors from 'cors';
import router from './router.js';
import mongoose from 'mongoose';

const PORT = 3003;
const URL =
  'mongodb+srv://andersonshtf3311:Root123@mongodbcluster.ijew0.mongodb.net/pizzaBox';

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
