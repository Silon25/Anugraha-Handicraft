// import express from 'express'
// import { loginUser, registerUser, adminLogin, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'


// const userRouter = express.Router();

// userRouter.post('/register', registerUser)
// userRouter.post('/login', loginUser)
// userRouter.post('/admin', adminLogin)
// router.get('/users', getAllUsers);  // Get all users
// router.get('/users/:id', getUserById);  // Get user by ID
// router.put('/users/:id', updateUser);  // Update user details
// router.delete('/users/:id', deleteUser);  // Delete user

// export default userRouter;


//new 

import express from 'express';
import { 
    loginUser, 
    registerUser, 
    adminLogin, 
    getAllUsers, 
    getUserData,
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);  // User registration
userRouter.post('/login', loginUser);        // User login
userRouter.post('/admin', adminLogin);       // Admin login
userRouter.get('/users', getAllUsers);       // Get all users
userRouter.get('/users/:id', getUserById);   // Get user by ID
userRouter.put('/users/:id', updateUser);    // Update user details
userRouter.delete('/users/:id', deleteUser); // Delete user
userRouter.get('/user', getUserData); // Add this route for fetching user data
userRouter.post('/user/update', updateUser); // Route for updating user data

export default userRouter;
