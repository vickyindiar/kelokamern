import mongoose from 'mongoose';

const invoicesSchema = new mongoose.Schema({
    invno: { type: String },
    invdate: { type: Date },
    note: {type: String}
}, { timestamps: true });
const Invoice = mongoose.model('Invoices', invoicesSchema);
export default Invoice;
