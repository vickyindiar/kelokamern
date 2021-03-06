import express from 'express';
import { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier  } from '../controllers/supplierController.js';

const route = express.Router();
route.route('/')
     .get(getSuppliers)
     .post(createSupplier);

route.route('/:id')
     .get(getSupplierById)
     .put(updateSupplier)
     .delete(deleteSupplier);
export default route;