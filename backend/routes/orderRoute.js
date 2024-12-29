import express from 'express'
import {updateStatus,userOrders, allOrders, placeOrder, placeOrderEsewa, placeOrderPhonepay} from "../controllers/orderController.js"
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)


// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/esewa', authUser, placeOrderEsewa)
orderRouter.post('/phonepay', authUser, placeOrderPhonepay)


//User Feature

orderRouter.post('/userorders', authUser,userOrders)

export default orderRouter