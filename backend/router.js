import express from 'express';
import pizzaController from './pizzaController.js';

const router = express.Router();

const controller = pizzaController();

router.post('/', controller.postPizza);
router.get('/', controller.getAllPizzas);
router.get('/:id', controller.getOnePizza);
router.delete('/:id', controller.deletePizza);
router.patch('/:id', controller.updatePizza);

export default router;
