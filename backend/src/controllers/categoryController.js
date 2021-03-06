import Category from '../models/categoryModel.js';

const getCategories = async(req, res) => {
    const p = await Category.find({});
    res.json(p);
}

const getCategoryById = async(req, res) => {
    const p = await Category.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Category not found ')
    }
}
const createCategory = async (req, res, next) => {
    let {name, desc } = req.body;
    const category = new Category({ name, desc });

    const postCategory = await category.save()
    res.status(201).json(postCategory)
}

const updateCategory = async(req, res) => {
    let {name, desc} = req.body;

    const category = await Category.findById(req.params.id)
    if(category){
        category.name = name;
        category.desc = desc;
        const postCategory = await category.save();
        res.json(postCategory);
    }
    else {
        res.status(404)
        throw new Error('Category not found !')
    }
}

const deleteCategory = async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (category) {
      await category.remove()
      res.json({ message: 'Category removed' })
    } else {
      res.status(404)
      throw new Error('Category not found')
    }
  }

  export {
    getCategories,
    getCategoryById,
    deleteCategory,
    createCategory,
    updateCategory
  }