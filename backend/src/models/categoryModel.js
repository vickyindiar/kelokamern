import mongoose from 'mongoose';
const caterogySchema = new mongoose.Schema({
    code: {type: String},
    name: {type: String},
    desc: {type: String}
}, {timestamps: true});
const Category = mongoose.model('Categories', caterogySchema);
export default Category;