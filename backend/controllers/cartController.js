import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        if (!userId || !itemId || !size) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        console.log("User ID: ", userId);
        console.log("Item ID: ", itemId);
        console.log("Size: ", size);


        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};  // Ensure cartData is initialized as an object

        // Check if the item already exists in the cart
        if (cartData[itemId]) {
            // If size exists, increase the quantity
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;  // Initialize size if it doesn't exist
            }
        } else {
            // Initialize item and size if not already present
            cartData[itemId] = { [size]: 1 };
        }

        // Update the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        if (!userId || !itemId || !size || quantity == null) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};  // Ensure cartData is initialized as an object

        // Update the quantity for the given item and size
        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;
        } else {
            return res.status(400).json({ success: false, message: "Item or size not found in cart" });
        }

        // Save the updated cart
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};  // Return an empty cart if no data exists

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}



// import userModel from "../models/userModel.js"

// // add products to user cart
// const addToCart = async (req,res)=>{
//     try {
        
//         const  {userId, itemId, size} = req.body
//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         if (cartData[itemId]) {
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] += 1
                
//             }else{
//                 cartData[itemId][size] = 1
//             }
            
//         } else {
//             cartData[itemId] = {}
//             cartData[itemId][size] = 1
//         }


//         await userModel.findByIdAndUpdate(userId, {cartData})

//         res.json ({success: true, message: "Added to Cart"})

//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
        
//     }
// }


// // update user cart
// const updateCart = async (req,res)=>{
//     try {
        
//         const {userId, itemId, size, quantity} = req.body

//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         cartData[itemId][size] = quantity

//         await userModel.findByIdAndUpdate(userId, {cartData})

//         res.json ({success: true, message: "Cart Updated"})


//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
//     }

// }



// // get user cart data
// const getUserCart = async (req,res)=>{

//     try {
        

//         const { userId} = req.body
//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         res.json({success: true, cartData})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
//     }

// }

 export {addToCart, updateCart, getUserCart}