import Invoice from '../models/invoiceModel.js';

const getInvoices = async(req, res) => {
    const p = await Invoice.find({});
    res.json(p);
}

const getInvoiceById = async(req, res) => {
    const p = await Invoice.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Invoice not found ')
    }
}
const createInvoice = async (req, res, next) => {
    let { invno, invdate, note } = req.body;
    const invoice = new Invoice({ invno, invdate, note  });

    const postInvoice = await invoice.save()
    res.status(201).json(postInvoice)
}

const updateInvoice = async(req, res) => {
    let {invno, invdate, note } = req.body;

    const invoice = await Invoice.findById(req.params.id)
    if(invoice){
        invoice.invno = invno;
        invoice.invdate = invdate;
        invoice.note = note;
        const postInvoice = await invoice.save();
        res.json(postInvoice);
    }
    else {
        res.status(404)
        throw new Error('invoice not found !')
    }
}

const deleteInvoice = async (req, res) => {
    const invoice = await Invoice.findById(req.params.id)
    if (invoice) {
      await invoice.remove()
      res.json({ message: 'Invoice removed' })
    } else {
      res.status(404)
      throw new Error('Invoice not found')
    }
  }

  export {
    getInvoices,
    getInvoiceById,
    deleteInvoice,
    createInvoice,
    updateInvoice
  }