import express from 'express';
import { getProfiles, getProfileById, createProfile, updateProfile, deleteProfile  } from '../controllers/profileController.js';

const route = express.Router();
route.route('/')
     .get(getProfiles)
     .post(createProfile);

route.route('/:id')
     .get(getProfileById)
     .put(updateProfile)
     .delete(deleteProfile);
export default route;