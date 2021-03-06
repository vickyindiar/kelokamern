import express from 'express';
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer  } from '../controllers/customerController.js';

const route = express.Router();
route.route('/')
     .get(getCustomers)
     .post(createCustomer);

route.route('/:id')
     .get(getCustomerById)
     .put(updateCustomer)
     .delete(deleteCustomer);
export default route;