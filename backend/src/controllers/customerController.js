import Customer from '../models/customerModel.js';

const getCustomers = async(req, res) => {
    const p = await Customer.find({});
    res.json(p);
}

const getCustomerById = async(req, res) => {
    const p = await Customer.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Customer not found ')
    }
}
const createCustomer = async (req, res, next) => {
    let { name, address, city, province, 
          phone, phone2, store, photo, desc } = req.body;
    const customer = new Customer({ name, address, city, province, 
        phone, phone2, store, photo, desc });

    const postCustomer = await customer.save()
    res.status(201).json(postCustomer)
}

const updateCustomer = async(req, res) => {
    let {name, address, city, province, 
        phone, phone2, store, photo, desc} = req.body;

    const customer = await Customer.findById(req.params.id)
    if(customer){
        customer.name = name;
        customer.address = address;
        customer.city = city;
        customer.province = province;
        customer.phone = phone;
        customer.phone2 = phone2;
        customer.store = store;
        customer.photo = photo;
        customer.desc = desc;
        const postCustomer = await customer.save();
        res.json(postCustomer);
    }
    else {
        res.status(404)
        throw new Error('customer not found !')
    }
}

const deleteCustomer = async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (customer) {
      await customer.remove()
      res.json({ message: 'Customer removed' })
    } else {
      res.status(404)
      throw new Error('Customer not found')
    }
  }

  export {
    getCustomers,
    getCustomerById,
    deleteCustomer,
    createCustomer,
    updateCustomer
  }