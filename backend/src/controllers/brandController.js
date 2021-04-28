import Brand from '../models/brandModel.js';

const getBrands = async(req, res) => {
    const p = await Brand.find({});
    res.json(p);
}

const getBrandById = async(req, res) => {
    const p = await Brand.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Brand not found ')
    }
}
const createBrand = async (req, res, next) => {
    let {name, desc } = req.body;
    const brand = new Brand({ name, desc });

    const postBrand = await brand.save()
    res.status(201).json(postBrand)
}

const updateBrand = async(req, res) => {
    let {name, desc} = req.body;

    const brand = await Brand.findById(req.params.id)
    if(brand){
        brand.name = name;
        brand.desc = desc;
        const postBrand = await brand.save();
        res.json(postBrand);
    }
    else {
        res.status(404)
        throw new Error('brand not found !')
    }
}

const deleteBrand = async (req, res) => {
    const brand = await Brand.findById(req.params.id)
    if (brand) {
      await brand.remove()
      res.json({ message: 'Brand removed' })
    } else {
      res.status(404)
      throw new Error('Brand not found')
    }
  }

  export {
    getBrands,
    getBrandById,
    deleteBrand,
    createBrand,
    updateBrand
  }