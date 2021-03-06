import mongoose from 'mongoose';
const brandSchema = new mongoose.Schema({
    name: { type: String },
    desc: { type: String }
}, { timestamps: true });
const Brand = mongoose.model('Brands', brandSchema);
export default Brand;
