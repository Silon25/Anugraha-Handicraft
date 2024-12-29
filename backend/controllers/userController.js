// import { response } from "express"
// import userModel from "../models/userModel.js";
// import validator from "validator";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';



// const createToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET)
// }


// // Route for user login
// const loginUser = async (req, res)=> {

//     try {
        
//         const {email, password} = req.body;
//         const user = await userModel.findOne({email});
        
//         if (!user) {
//             return res.json({success: false, message: "User doesnot exists"})      
//         }

//         const isMatched = await bcrypt.compare(password, user.password);

//         if (isMatched) {

//             const token = createToken(user._id)
//             res.json({success:true, token})
            
//         }
//         else{
//             res.json({success:false, message: 'Invalid credentials'})
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
        
//     }


// }


// //Route for user Registration

// const registerUser = async (req, res)=>{

//     try {
        
//         const  {name, email, password} = req.body;
//         // checking if user already  exists 
//         const exists = await userModel.findOne({email});
//         if (exists) {
//             return res.json({success: false, message: "User already exists"})            
//         }

//         //validating email format & strong password
//         if (!validator.isEmail(email)) {
//             return res.json({success: false, message: "Please enter a valid email"})  
            
//         }

//         if (password.length < 8 ) {
//             return res.json({success: false, message: "Please enter a strong password"})  
//                     }

//         // hashing user password


//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const newUser = new userModel({
//             name,
//             email,
//             password:hashedPassword
//         })

//         const user = await newUser.save() 

//         const token = createToken(user._id)

//         res.json({success:true, token})


//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
        
//     }

// }


// // Route for Admin login

// const adminLogin = async (req,res) => {

//     try {
        
//         const {email, password} = req.body
//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

//             const token = jwt.sign(email + password, process.env.JWT_SECRET);
//             res.json({success:true, token})
            
//         } else {
//             res.json({success:false, mesaage:"Invalid Credentials"})
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
//     }
// }


// export { loginUser, registerUser, adminLogin}


/// New update

import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';

// Helper function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};


// Route for user login
const loginUser = async (req, res)=> {

    try {
        
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        
        if (!user) {
            return res.json({success: false, message: "User doesnot exists"})      
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (isMatched) {

            const token = createToken(user._id)
            res.json({success:true, token})
            
        }
        else{
            res.json({success:false, message: 'Invalid credentials'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }


}

// Route for user Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill in all required fields" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long and include uppercase, lowercase, and a number" });
        }

        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Profile picture handling with Cloudinary
        let profilePictureUrl = ""; // Default if no image is uploaded
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path);
                profilePictureUrl = result.secure_url;
            } catch (cloudinaryError) {
                return res.status(500).json({ success: false, message: "Error uploading profile picture" });
            }
        }

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            profilePicture: profilePictureUrl, // Store profile picture URL
            address: address || {} // Default to empty object if no address is provided
        });

        // Save user to database
        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);

        // Respond with user data and token
        return res.status(201).json({
            success: true,
            token,
            user: {
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture, // Return profile picture
                address: user.address // Return address
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// // Route for Admin login

const adminLogin = async (req,res) => {

    try {
        
        const {email, password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({success:true, token})
            
        } else {
            res.json({success:false, mesaage:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


// update for getting user

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password'); // Exclude password
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update user profile (address, profile picture, etc.)
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, profilePicture, address } = req.body;

        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update user details
        if (name) user.name = name;
        if (email) user.email = email;
        if (profilePicture) user.profilePicture = profilePicture;
        if (address) {
            user.address.street = address.street || user.address.street;
            user.address.city = address.city || user.address.city;
            user.address.state = address.state || user.address.state;
            user.address.country = address.country || user.address.country;
            user.address.postalCode = address.postalCode || user.address.postalCode;
        }

        // Save the updated user
        const updatedUser = await user.save();

        res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get user data using the token
const getUserData = async (req, res) => {
    try {
      const token = req.headers.token;
      if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

export { loginUser, registerUser, adminLogin, getAllUsers, getUserById, updateUser, deleteUser, getUserData };
