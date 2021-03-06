import express from 'express';
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder  } from '../controllers/orderController.js';

const route = express.Router();
route.route('/')
     .get(getOrders)
     .post(createOrder);

route.route('/:id')
     .get(getOrderById)
     .put(updateOrder)
     .delete(deleteOrder);
export default route;