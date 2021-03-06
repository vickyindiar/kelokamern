import jwt from 'jsonwebtoken'
import User from '../src/models/authModel.js'
import Role from '../src/models/roleModel.js'

const authValidation = async(req, res, next) => {
    let token;
    let authorization = req.headers.authorization;
    if(authorization){
        try {
            token = authorization.split(' ')[1];
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(verified.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Token failed');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Token not found !');
    }
}

const isAdmin = async(req, res, next) => {
    const role = await Role.findById(req.user.role);
    if(req.user && role.name === 'admin'){
        next()
    }
    else{
        res.status(401);
        throw new Error('Not authorized');
    }
}

export {authValidation, isAdmin}