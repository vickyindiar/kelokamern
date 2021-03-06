import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    code: {type: String, required: true },
    name: {type: String, required: true },
    sprice: {type:Number, required: true },
    bprice: {type:Number, required: true },
    qtytype:{type:mongoose.Schema.Types.ObjectId, ref:'QtyTypes'},
    stock:{type:Number, required: true },
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Categories'},
    supplier:{type:mongoose.Schema.Types.ObjectId, ref:'Suppliers'},
    brand:{type:mongoose.Schema.Types.ObjectId, ref:'Brands'},
    color:{type:String},
    image: {type:String},
    desc: {type:String}
}, {timestamps: true});

const Product = mongoose.model('Products', productSchema);
export default Product;