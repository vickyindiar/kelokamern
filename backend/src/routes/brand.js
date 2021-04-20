import express from 'express';
import { authValidation } from '../../middleware/authMiddleware.js';
import { getBrands, getBrandById, createBrand, updateBrand, deleteBrand  } from '../controllers/brandController.js';

const route = express.Router();
route.route('/')
     .get(authValidation, getBrands)
     .post(authValidation, createBrand)
     .delete(authValidation, deleteBrand);

route.route('/:id')
     .get(getBrandById)
     .put(updateBrand)
     .delete(deleteBrand);
export default route;