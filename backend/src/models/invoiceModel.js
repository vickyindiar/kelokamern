import mongoose from 'mongoose';

const invoicesSchema = new mongoose.Schema({
    invoice_no: { type: String },
    invoice_date: { type: Date },
    customer:{type: mongoose.Schema.Types.ObjectId, ref:'Customers'},
    user:{type: mongoose.Schema.Types.ObjectId, ref:'Users'},
    status:{type:String}, //lunas||belum lunas
    due_date:{type:Date}, //jatuh tempo
    payment:{type:String}, //cash||transfer
    add_charge:{type:Number},
    add_disc:{type:Number},
    total:{type:Number},
    gtotal:{type:Number},
    cash:{type:Number},
    change_due:{type:Number},
    transfer:{type:Number},
    note: {type: String}
}, { timestamps: true });
const Invoice = mongoose.model('Invoices', invoicesSchema);
export default Invoice;
