import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


//Placing orders using COD Method

const placeOrder = async (req,res) => {

    try {
        const { userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, {cartData:{}})

            res.json({success: true, message: "Order Placed"})
        

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}


//Placing orders using Esewa Method

const placeOrderEsewa = async (req,res) => {

    
}


//Placing orders using fonepay Method

const placeOrderPhonepay = async (req,res) => {

    
}

// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        const orders = await orderModel.find({})

        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

// User Order data for frontend
const userOrders = async (req,res) => {

    try {
        
        const {userId} = req.body

        const orders = await orderModel.find({userId})
        res.json({success:true, orders})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
    
}

// Update order status from Admin
const updateStatus = async (req,res) => {

    try {
        const  {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message: 'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}


export {updateStatus,userOrders, allOrders, placeOrder, placeOrderEsewa, placeOrderPhonepay,}