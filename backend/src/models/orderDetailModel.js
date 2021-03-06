import mongoose, { mongo, SchemaTypes } from 'mongoose';

const Schema = mongoose.Schema;

const orderDetail = new Schema({
    order_id:{type:mongoose.Schema.Types.ObjectId, ref:'Orders'},
    product_id:{type:mongoose.Schema.Types.ObjectId, ref:'Products'},
    qty:{type:Number},
    qtytype_id:{type:mongoose.Schema.Types.ObjectId, ref:'QtyTypes'},
    disc: { type: Number },
    price: { type: Number }
}, {timestamps: true});

export default mongoose.model('OrderDetails', orderDetail);