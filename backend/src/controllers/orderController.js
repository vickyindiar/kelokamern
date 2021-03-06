import Order from '../models/orderModel.js';

const getOrders = async(req, res) => {
    const p = await Order.find({});
    res.json(p);
}

const getOrderById = async(req, res) => {
    const p = await Order.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Order not found ')
    }
}
const createOrder = async (req, res, next) => {
    let { 
        order_no, order_date, invoice_id, customer_id, user_id,
        status, method, dp, stotal, due_date,
        shipping, others, gdisc, gtotal
    } = req.body;
    const order = new Order({ 
        order_no, order_date, invoice_id, customer_id, user_id,
        status, method, dp, stotal, due_date,
        shipping, others, gdisc, gtotal
     });

    const postOrder = await order.save()
    res.status(201).json(postOrder)
}

const updateOrder = async(req, res) => {
    let { order_no, order_date, invoice_id, customer_id, user_id,
        status, method, dp, stotal, due_date,
        shipping, others, gdisc, gtotal} = req.body;

    const order = await Order.findById(req.params.id)
    if(order){
        order.order_no = order_no;
        order.order_date = order_date;
        order.invoice_id = invoice_id;
        order.customer_id = customer_id;
        order.user_id = user_id;
        order.status = status;
        order.method = method;
        order.dp = dp;
        order.stotal = stotal; 
        order.due_date = due_date;
        order.shipping = shipping;
        order.others = others;
        order.gdisc = gdisc;
        order.gtotal = gtotal;
        const postOrder = await order.save();
        res.json(postOrder);
    }
    else {
        res.status(404)
        throw new Error('order not found !')
    }
}

const deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      await order.remove()
      res.json({ message: 'Order removed' })
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  }

  export {
    getOrders,
    getOrderById,
    deleteOrder,
    createOrder,
    updateOrder
  }