import express from 'express';
import { getQtytypes, getQtytypeById, createQtytype, updateQtytype, deleteQtytype  } from '../controllers/qtytypeController.js';

const route = express.Router();
route.route('/')
     .get(getQtytypes)
     .post(createQtytype);

route.route('/:id')
     .get(getQtytypeById)
     .put(updateQtytype)
     .delete(deleteQtytype);
export default route;