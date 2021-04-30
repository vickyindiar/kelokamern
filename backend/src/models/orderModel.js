import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    order_no:{type:String},
    order_date:{type:String},
    invoice:{type: mongoose.Schema.Types.ObjectId, ref:'Invoices'},
    customer:{type: mongoose.Schema.Types.ObjectId, ref:'Customers'},
    user:{type: mongoose.Schema.Types.ObjectId, ref:'Users'},
    stotal:{type:Number}, //sub total
    gdisc:{type:Number}, //-> grand discount
    gtotal:{type:Number} //-> grand total;
},{timestamps: true});
const Order = mongoose.model('Orders', orderSchema);
export default Order;