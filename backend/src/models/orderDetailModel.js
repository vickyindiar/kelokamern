import mongoose, { mongo, SchemaTypes } from 'mongoose';

const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
    order:{type:mongoose.Schema.Types.ObjectId, ref:'Orders'},
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Products'},
    qty:{type:Number},
    qtytype:{type:mongoose.Schema.Types.ObjectId, ref:'QtyTypes'},
    disc: {type: Number},
    price: {type: Number},
    total:{type:Number}
}, {timestamps: true});

export default mongoose.model('OrderDetails', orderDetailSchema);