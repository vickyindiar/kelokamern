import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    image: { type: String },
    desc: { type: String }
}, { timestamps: true });

const Profile = mongoose.model('Profiles', profileSchema);

export default Profile;