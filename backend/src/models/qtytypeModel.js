import mongoose from 'mongoose';

const qtyTypeSchema = new mongoose.Schema({
    name: { type: String },
    desc: { type: String }
}, { timestamps: true });

const Qtytype = mongoose.model('QtyTypes', qtyTypeSchema);
export default Qtytype;
