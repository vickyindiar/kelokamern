import Supplier from '../models/supplierModel.js';

const getSuppliers = async(req, res) => {
    const p = await Supplier.find({});
    res.json(p);
}

const getSupplierById = async(req, res) => {
    const p = await Supplier.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Supplier not found ')
    }
}
const createSupplier = async (req, res, next) => {
    let { name, address, city, province, 
          phone, phone2, store, photo, desc } = req.body;
    const supplier = new Supplier({ name, address, city, province, 
        phone, phone2, store, photo, desc });

    const postSupplier = await supplier.save()
    res.status(201).json(postSupplier)
}

const updateSupplier = async(req, res) => {
    let {name, address, city, province, 
        phone, phone2, store, photo, desc} = req.body;

    const supplier = await Supplier.findById(req.params.id)
    if(supplier){
        supplier.name = name;
        supplier.address = address;
        supplier.city = city;
        supplier.province = province;
        supplier.phone = phone;
        supplier.phone2 = phone2;
        supplier.store = store;
        supplier.photo = photo;
        supplier.desc = desc;
        const postSupplier = await supplier.save();
        res.json(postSupplier);
    }
    else {
        res.status(404)
        throw new Error('supplier not found !')
    }
}

const deleteSupplier = async (req, res) => {
    const supplier = await Supplier.findById(req.params.id)
    if (supplier) {
      await supplier.remove()
      res.json({ message: 'Supplier removed' })
    } else {
      res.status(404)
      throw new Error('Supplier not found')
    }
  }

  export {
    getSuppliers,
    getSupplierById,
    deleteSupplier,
    createSupplier,
    updateSupplier
  }