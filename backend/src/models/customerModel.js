import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: {type: String, required:true},
    address: {type:String},
    city:{type: String},
    province:{type:String},
    phone:{type:String},
    phone2:{type:String},
    store:{type:String},
    photo:{type:String},
    desc:{type:String}
}, {timestamps:true});
const customer = mongoose.model('Customers', customerSchema);
export default customer;

