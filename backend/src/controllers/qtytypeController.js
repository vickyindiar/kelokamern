import Qtytype from '../models/qtytypeModel.js';

const getQtytypes = async(req, res) => {
    const p = await Qtytype.find({});
    res.json(p);
}

const getQtytypeById = async(req, res) => {
    const p = await Qtytype.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Qtytype not found ')
    }
}
const createQtytype = async (req, res, next) => {
    let { name, desc } = req.body;
    const qtytype = new Qtytype({ name, desc });

    const postQtytype = await qtytype.save()
    res.status(201).json(postQtytype)
}

const updateQtytype = async(req, res) => {
    let {name, desc} = req.body;

    const qtytype = await Qtytype.findById(req.params.id)
    if(qtytype){
        qtytype.name = name;
        qtytype.desc = desc;
        const postQtytype = await qtytype.save();
        res.json(postQtytype);
    }
    else {
        res.status(404)
        throw new Error('qtytype not found !')
    }
}

const deleteQtytype = async (req, res) => {
    const qtytype = await Qtytype.findById(req.params.id)
    if (qtytype) {
      await qtytype.remove()
      res.json({ message: 'Qtytype removed' })
    } else {
      res.status(404)
      throw new Error('Qtytype not found')
    }
  }

  export {
    getQtytypes,
    getQtytypeById,
    deleteQtytype,
    createQtytype,
    updateQtytype
  }