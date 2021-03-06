import express from 'express';
import { 
     getCategories, getCategoryById, createCategory, 
    updateCategory, deleteCategory  } from '../controllers/categoryController.js';

const route = express.Router();
route.route('/')
     .get(getCategories)
     .post(createCategory);

route.route('/:id')
     .get(getCategoryById)
     .put(updateCategory)
     .delete(deleteCategory);
export default route;