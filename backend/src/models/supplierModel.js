import mongoose from 'mongoose';

const suppliersSchema = new mongoose.Schema({
    name: {type: String},
    address: {type:String},
    city:{type: String},
    province:{type:String},
    phone:{type:String},
    phone2:{type:String},
    store:{type:String},
    photo:{type:String},
    desc:{type:String}
}, {timestamps: true});
const Supplier = mongoose.model('Suppliers', suppliersSchema);
export default Supplier;