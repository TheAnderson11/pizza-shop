import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  types: { type: Array, required: true },
  sizes: { type: Array, required: true },
  price: { type: Number, required: true },
  category: { type: Number, required: true },
  rating: { type: Number, required: true },
});

const Pizzas = mongoose.model('pizza', pizzaSchema);

export default Pizzas;
