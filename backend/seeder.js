import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/conn.js'
import colors from 'colors'
import { roles, users, profiles, brands, categories, qtytypes, customers, suppliers, products, orders, orderDetails, invoices } from './config/data.js'
import Role from './src/models/roleModel.js'
import User from './src/models/authModel.js'
import Profile from './src/models/profileModel.js'
import Brand from './src/models/brandModel.js'
import Category from './src/models/categoryModel.js'
import Qtytype from './src/models/qtytypeModel.js'
import Customer from './src/models/customerModel.js'
import Supplier from './src/models/supplierModel.js'
import Product from './src/models/productModels.js'
import Order from './src/models/orderModel.js'
import OrderDetail from './src/models/orderDetailModel.js'
import Invoice from './src/models/invoiceModel.js'

dotenv.config()

connectDB()

const importData = async() =>{
    const lookup = (eArr, xArr, xName, eName) => {
        eArr.forEach(e => {
            let row = xArr.find(x => x[xName] === e[eName]);
            e[eName] = row._id;
        });
    }
    try {
        await Role.deleteMany()
        await User.deleteMany()
        await Profile.deleteMany()
        await Brand.deleteMany()
        await Category.deleteMany()
        await Qtytype.deleteMany()
        await Customer.deleteMany()
        await Supplier.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
        await OrderDetail.deleteMany()
        await Invoice.deleteMany()
    

         const createdRoles = await Role.insertMany(roles);

         lookup(users, createdRoles, 'name', 'role');
         const createdUsers = await User.insertMany(users);

         lookup(profiles, createdUsers, 'name', 'user');
         const createdProfiles = await Profile.insertMany(profiles);

         const createdBrands = await Brand.insertMany(brands);
         const createdCategories = await Category.insertMany(categories);
         const createdQtytypes = await Qtytype.insertMany(qtytypes);
         const createdCustomers = await Customer.insertMany(customers);
         const createdSuppliers = await Supplier.insertMany(suppliers);

         lookup(products, createdQtytypes, 'name', 'qtytype');
         lookup(products, createdCategories, 'code', 'category');
         lookup(products, createdSuppliers, 'name', 'supplier');
         lookup(products, createdBrands, 'name', 'brand');
         const createdProducts = await Product.insertMany(products);

         lookup(invoices, createdCustomers, 'name', 'customer');
         lookup(invoices, createdUsers, 'name', 'user');    
         const createdInvoice = await Invoice.insertMany(invoices);

         lookup(orders, createdCustomers, 'name', 'customer');
         lookup(orders, createdUsers, 'name', 'user');  
         lookup(orders, createdInvoice, 'invoice_no', 'invoice');  
         const createdOrder = await Order.insertMany(orders);

         lookup(orderDetails, createdOrder, 'order_no', 'order');
         lookup(orderDetails, createdUsers, 'name', 'product');  
         lookup(orderDetails, createdQtytypes, 'name', 'qtytype');
         const createdOrderDetail = await Order.insertMany(orderDetails);

        console.log('Data Imported !'.green);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red);
        process.exit(1);
    }
}

const destroyData = async(notif) => {
    try {
        await Role.deleteMany()
        await User.deleteMany()
        await Profile.deleteMany()
        await Brand.deleteMany()
        await Category.deleteMany()
        await Qtytype.deleteMany()
        await Customer.deleteMany()
        await Supplier.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
        await Order.deleteMany()
        await OrderDetail.deleteMany()
        await Invoice.deleteMany()
        if(notif){
            console.log('Data Destroyed !'.green)
            process.exit()   
        }
    } catch (error) {
        console.log(`${error}`.red);
        process.exit(1); 
    }
}

if(process.argv[2] === '-d') destroyData(true)
else importData();