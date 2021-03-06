import express from 'express';
import { getInvoices, getInvoiceById, createInvoice, updateInvoice, deleteInvoice  } from '../controllers/invoiceController.js';

const route = express.Router();
route.route('/')
     .get(getInvoices)
     .post(createInvoice);

route.route('/:id')
     .get(getInvoiceById)
     .put(updateInvoice)
     .delete(deleteInvoice);
export default route;