import express from 'express';
import { authValidation } from '../../middleware/authMiddleware.js';
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
  } from '../controllers/productController.js'

const route = express.Router();
const {body, validationResult} = require('express-validator')

route.route('/')
     .get(authValidation, getProducts)
     .post(authValidation, createProduct)
     .delete(authValidation, deleteProduct)
route.route('/:_id')
     .get(authValidation, getProductById)
     .delete(authValidation, deleteProduct)
     .put(authValidation, updateProduct)
  
export default route;