import express from 'express';
import { getBrands, getBrandById, createBrand, updateBrand, deleteBrand  } from '../controllers/brandController.js';

const route = express.Router();
route.route('/')
     .get(getBrands)
     .post(createBrand);

route.route('/:id')
     .get(getBrandById)
     .put(updateBrand)
     .delete(deleteBrand);
export default route;