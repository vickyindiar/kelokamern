import express from 'express';
import { getOrderDetails, getOrderDetailById, createOrderDetail, updateOrderDetail, deleteOrderDetail  } from '../controllers/orderDetailController.js';

const route = express.Router();
route.route('/')
     .get(getOrderDetails)
     .post(createOrderDetail);

route.route('/:id')
     .get(getOrderDetailById)
     .put(updateOrderDetail)
     .delete(deleteOrderDetail);
export default route;