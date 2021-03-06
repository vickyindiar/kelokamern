import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/conn.js';
import colors from 'colors';
//==========================ROUTER

import authRouter from './src/routes/auth.js';
import brandRouter from './src/routes/brand.js';
import categoryRouter from './src/routes/category.js';
import customerRouter from './src/routes/customer.js';
import invoiceRouter from './src/routes/invoice.js';
import orderRouter from './src/routes/order.js';
import orderDetailRouter from './src/routes/orderDetail.js';
import productRouter from './src/routes/product.js';
import profileRouter from './src/routes/profile.js';
import qtytypeRouter from './src/routes/qtytype.js';
import roleRouter from './src/routes/role.js';
import supplierRouter from './src/routes/supplier.js';
import {router as uploadRouter} from './src/routes/uploader.js';
//==========================

dotenv.config(); // .env init
connectDB();
const app = express();

//========================MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
if(process.env.NODE_ENV === 'development') { app.use(morgan('dev')) }
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//=========================

app.use('/v1/auth', authRouter);
app.use('/v1/brand', brandRouter);
app.use('/v1/category', categoryRouter);
app.use('/v1/customer', customerRouter);
app.use('/v1/invoice', invoiceRouter);
app.use('/v1/order', orderRouter);
app.use('/v1/orderDetail', orderDetailRouter);
app.use('/v1/product', productRouter);
app.use('/v1/profile', profileRouter);
app.use('/v1/qtytpe', qtytypeRouter);
app.use('/v1/role', roleRouter);
app.use('/v1/supplier', supplierRouter);
app.use('/v1/upload', uploadRouter);

const PORT = process.env.PORT || 5000

app.listen( PORT, console.log( `Server running in ${process.env.NODE_ENV} mode on port ${PORT}` .green.inverse) )

