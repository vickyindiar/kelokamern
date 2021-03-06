import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    order_no:{type:String},
    order_date:{type:String},
    invoice:{type: mongoose.Schema.Types.ObjectId, ref:'Invoices'},
    customer:{type: mongoose.Schema.Types.ObjectId, ref:'Customers'},
    user:{type: mongoose.Schema.Types.ObjectId, ref:'Users'},
    status:{type:String}, //lunas||belum lunas
    method:{type:String}, //cash||transfer
    dp:{type:Number}, //downpayment
    stotal:{type:Number}, //sub total
    due_date:{type:Date}, //jatuh tempo
    shipping:{type:Number}, //ongkir
    others:{type:String}, //lainya
    gdisc:{type:Number}, //-> grand discount
    gtotal:{type:Number} //-> grand total;
},{timestamps: true});
const Order = mongoose.model('Orders', orderSchema);
export default Order;