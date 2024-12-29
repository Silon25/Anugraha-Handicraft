// import React, { useContext, useState } from 'react'
// import Title from '../components/Title'
// import CartTotal from '../components/CartTotal'
// import { assets } from '../assets/assets'
// import esewa from '../assets/esewa.png'
// import fonepay from '../assets/fonepay.png'
// import { ShopContext } from '../context/ShopContext'
// import axios from 'axios'

// const PlaceOrder = () => {

//   const [method, setMethod] = useState('cod');
//   const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email:'',
//     street:'',
//     city:'',
//     state:'',
//     zipcode:'',
//     country:'',
//     phone:''
//   })

//   const onChangeHandler = (event)=>{
//     const name = event.target.name;
//     const value = event.target.value

//     setFormData(data => ({...data,[name]:value}))
//   }

//   const onSubmitHandler = async (event)=> {
//     event.preventDefault()
//     try {
//       let orderItems = []

//       for(const items in cartItems){
//         for(const item in cartItems[items]){
//           if (cartItems[items][item] > 0) {
//             const itemInfo = structuredClone(products.find(product => product._id === items))
//             if (itemInfo) {
//               itemInfo.size = item
//               itemInfo.quantity = cartItems[items][item]
//               orderItems.push(itemInfo)
//             }
//           }
//         }
//       }
//       console.log(orderItems);

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount :getCartAmount()+ delivery_fee
//       }

//       console.log(method);
      
       
//       switch (method){
//         // API for COD

//         case 'cod':
//           const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
//           console.log(response.data)
//           if (response.data.success) {
//             setCartItems({})
//             navigate('/orders')
            
//           }
//           else{
//             toast.error(response.data.message)
//           }
//           break;

//           default:
//               break;
//       }


//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }

//   }
 

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-4 min-h-[80vh] border-t'>

// {/* Left side */}


//       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

//         <div className='text-xl sm:text-2xl my-3'>
//           <Title text1={'DELIVERY'} text2={'INFORMATION'}/>

//         </div>
//         <div className='flex gap-3'>
          
//           <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
//           <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>

//         </div>
//         <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address'/>
//         <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
//         <div className='flex gap-3'>
          
//           <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
//           <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>

//         </div>
//         <div className='flex gap-3'>
          
//           <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
//           <input required  onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>

//         </div>
//         <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone'/>

//       </div>

//       {/* -------------- Right Side ------------------ */}

//       <div className='mt-8'>
//         <div className='mt-8 min-w-8-'>

//           <CartTotal/>

//         </div>
//         <div className='mt-12'>
//           <Title text1={'PAYMENT'} text2={'METHOD'} />


//           {/* ------------ payment method selection -------------*/}
//           <div  className='flex flex-col gap-3 lg:flex-row'>
//             <div onClick={()=>setMethod('fonepay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rouded-full ${method === 'fonepay' ? 'bg-green-400' : ''} `}></p>
//               {/* <img className='h-5 mx-4' src={assets.stripe_logo} alt="" /> */}
//               <img className='h-5 mx-4' src={fonepay} alt="" />

//             </div>
//             <div onClick={()=>setMethod('esewa')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rouded-full ${method === 'esewa' ? 'bg-green-400' : ''} `}></p>
//               {/* <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" /> */}
//               <img className='h-5 mx-4' src={esewa} alt="" />

//             </div>
//             <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rouded-full ${method === 'cod' ? 'bg-green-400' : ''} `}></p>
//               <p className='text-gray-500 text-sm font-medium mx-4'>CASH  ON DELIVERY</p>

//             </div>

//           </div>

//           <div className='w-full text-end mt-8'>
//             <button type='submit'  className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>

//           </div>

//         </div>

//       </div>
      
//     </form>
//   )
// }

// export default PlaceOrder



//New Update
import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import esewa from '../assets/esewa.png';
import fonepay from '../assets/fonepay.png';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import emailjs from '@emailjs/browser'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});


          // Send confirmation email
          const emailData = {
            to_name: `${formData.firstName} ${formData.lastName}`,
            to_email: formData.email,
            order_details: orderItems
              .map(
                (item) =>
                  `${item.name} (Size: ${item.size}, Quantity: ${item.quantity}, Price: ${item.price})`
              )
              .join('\n'),
            total_amount: getCartAmount() + delivery_fee,
            delivery_details: `
      Address: ${formData.street}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.zipcode}
      Phone: ${formData.phone}
    `,
    payment_method: method === 'cod' ? 'Cash on Delivery' : method.toUpperCase(),

          };

           // Keys
        const serviceId = 'service_pan993s';
        const templateId = 'template_woa6e55';
        const publicKey = 'h4K6ywGeZu0wgf8_3';

          emailjs
            .send(
              serviceId, 
              templateId, 
              emailData,
              publicKey 
            )
            .then(() => {
              console.log('Order confirmation email sent successfully');
            })
            .catch((error) => {
              console.error('Error sending email:', error);
            });


            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-4 min-h-[80vh] border-t'>
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-1'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' />
      </div>

      {/* Right Side - Order Details and Payment */}
      <div className='flex flex-col flex-grow h-[80vh] justify-between'>
        {/* Render cart items here */}
        <div className='text-xl sm:text-2xl mb-6'>
          <Title text1={'ORDER'} text2={'DETAILS'} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='border p-3 rounded-lg shadow-md'>
                <img className='w-full h-20 object-cover' src={productData.image[0]} alt={productData.name} />
                <div className='mt-2 text-center'>
                  <p className='text-xs'>{productData.name}</p>
                  <p className='text-xs'>Size: {item.size}</p>
                  <p className='text-xs'>Quantity: {item.quantity}</p>
                  <p className='text-xs'>Price: {productData.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Total */}
        <div className='mt-4'>
          <CartTotal />
        </div>

        {/* Payment Method */}
        <div className='mt-4'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex flex-col gap-3 lg:flex-row'>
            <div onClick={() => setMethod('fonepay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'fonepay' ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 mx-4' src={fonepay} alt='Fonepay' />
            </div>
            <div onClick={() => setMethod('esewa')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'esewa' ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 mx-4' src={esewa} alt='Esewa' />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-4'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
