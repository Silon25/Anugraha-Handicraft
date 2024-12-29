//  import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {type:String, required: true},
//     email: {type:String, required: true, unique: true},
//     password: {type:String, required: true},
//     cartData: {type:Object, default: {}}

// },{minimize:false})


// const  userModel = mongoose.models.user || mongoose.model('User', userSchema);

// export  default userModel


// New  update


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Profile picture URL (uploaded via Cloudinary)
    profilePicture: { type: String, required:false, default: "" }, 

    // Address information
    address: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" },
        postalCode: { type: String, default: "" },
    },

    // Cart data (remains unchanged)
    cartData: { type: Object, default: {} },

    // Date when account is created
    createdAt: { type: Date, default: Date.now }

}, { minimize: false });

// Ensure that the model is only created once if it already exists
const userModel = mongoose.models.user || mongoose.model('User', userSchema);

export default userModel;
