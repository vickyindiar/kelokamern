import Profile from '../models/profileModel.js';

const getProfiles = async(req, res) => {
    const p = await Profile.find({});
    res.json(p);
}

const getProfileById = async(req, res) => {
    const p = await Profile.findById(req.params.id);
    if (p) { res.json(p) }
    else {
        res.status(404)
        throw new Error('Profile not found ')
    }
}
const createProfile = async (req, res, next) => {
    let { user, name, address, phone, image, desc } = req.body;
    const profile = new Profile({  user, name, address, phone, image, desc });

    const postProfile = await profile.save()
    res.status(201).json(postProfile)
}

const updateProfile = async(req, res) => {
    let {user, name, address, phone, image, desc} = req.body;

    const profile = await Profile.findById(req.params.id)
    if(profile){
        profile.user = user;
        profile.name = name;
        profile.address = address;
        profile.phone = phone;
        profile.image = image;
        profile.desc = desc;
        const postProfile = await profile.save();
        res.json(postProfile);
    }
    else {
        res.status(404)
        throw new Error('profile not found !')
    }
}

const deleteProfile = async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    if (profile) {
      await profile.remove()
      res.json({ message: 'Profile removed' })
    } else {
      res.status(404)
      throw new Error('Profile not found')
    }
  }

  export {
    getProfiles,
    getProfileById,
    deleteProfile,
    createProfile,
    updateProfile
  }