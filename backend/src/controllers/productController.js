import Product from '../models/productModels.js';
import {removeFile} from '../routes/uploader.js';

const getProducts = async(req, res) => {
    const p = await Product.find({});
    res.json(p);
}

const getProductById = async(req, res) => {
    const p = await Product.findById(req.params._id);
    if (p) {
        res.json(p)
    } else {
        res.status(404)
        throw new Error('Product not found ')
    }
}
const createProduct = async (req, res, next) => {
    let { code, name, sprice, bprice, qtytype, stock,
        category, supplier, brand, color,
        image, desc } = req.body;
    try {
        const product = new Product({
            code, name, sprice, bprice, qtytype, stock,
            category, supplier, brand, color,
            image, desc
        });
    
        const postProduct = await product.save()
        res.status(201).json(postProduct)
    } catch (error) {
    }
}

const updateProduct = async(req, res) => {
    let {code, name, sprice, bprice, qtytype, stock,
        category, supplier, brand, color,
        image, desc } = req.body;
        const product = await Product.findById(req.params._id);
        if(product){
            if(product.image !== image){
                let lastImg = [];
                lastImg.push(product.image);
                await removeFile(lastImg);
            }

            product.code = code;
            product.name = name;
            product.sprice = sprice;
            product.bprice = bprice;
            product.qtytype = qtytype;
            product.stock = stock;
            product.category = category;
            product.supplier = supplier;
            product.brand = brand;
            product.color = color;
            product.image = image;
            product.desc = desc;

            const postProduct = await product.save();
            res.json(postProduct);
        }
        else {
            res.status(404)
            throw new Error('product not found !')
        }
}

const deleteProduct = async (req, res) => {
    if(req.query.deleteMany === '1'){
        const _ids = req.body.data._id;
        if(_ids){
            await removeFile(req.body.data._img)
            await Product.deleteMany({_id:{$in:_ids}});
            res.json({ message: 'Product removed' })    
        }
        else{
        res.status(404)
        throw new Error('error delet many')
        }
    }
    else {
        const product = await Product.findById(req.params._id)
        if (product) {
          await removeFile(req.body.data._img)
          await product.remove()
          res.json({ message: 'Product removed' })
        } else {
          res.status(404)
          throw new Error('Product not found')
        }
    }

}

  export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
  }