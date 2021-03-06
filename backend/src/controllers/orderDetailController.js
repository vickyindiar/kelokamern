import OrderDetail from '../models/orderDetailModel.js';

const getOrderDetails = async(req, res) => {
    const p = await OrderDetail.find({});
    res.json(p);
}

const getOrderDetailById = async(req, res) => {
    const p = await OrderDetail.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('OrderDetail not found !')
    }
}
const createOrderDetail = async (req, res) => {
    let { name, order_id, product_id, qty, qtytype_id, disc, price } = req.body;
    const orderDetail = new OrderDetail({ name, order_id, product_id, qty, qtytype_id, disc, price });

    const postOrderDetail = await orderDetail.save()
    res.status(201).json(postOrderDetail)
}

const updateOrderDetail = async(req, res) => {
    let {name, order_id, product_id, qty, qtytype_id, disc, price} = req.body;

    const orderDetail = await OrderDetail.findById(req.params.id)
    if(orderDetail){
        orderDetail.name = name;
        orderDetail.order_id = order_id; 
        orderDetail.product_id = product_id; 
        orderDetail.qty = qty; 
        orderDetail.qtytype_id = qtytype_id;
        orderDetail.disc = disc; 
        orderDetail.price = price;
        const postOrderDetail = await orderDetail.save();
        res.json(postOrderDetail);
    }
    else {
        res.status(404)
        throw new Error('orderDetail not found !')
    }
}

const deleteOrderDetail = async (req, res) => {
    const orderDetail = await OrderDetail.findById(req.params.id)
    if (orderDetail) {
      await orderDetail.remove()
      res.json({ message: 'OrderDetail removed !' })
    } else {
      res.status(404)
      throw new Error('OrderDetail not found !')
    }
  }

  export {
    getOrderDetails,
    getOrderDetailById,
    deleteOrderDetail,
    createOrderDetail,
    updateOrderDetail
  }