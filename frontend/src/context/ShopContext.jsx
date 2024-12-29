import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = 'NRs ';
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [cartCount, setCartCount] = useState(0);  // Cart count state
  const navigate = useNavigate();

  // Add to Cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
        toast.success("Product added to cart");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Update Cart Count
  useEffect(() => {
    const calculateCartCount = () => {
      let totalCount = 0;
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        }
      }
      setCartCount(totalCount);
    };
    calculateCartCount();
  }, [cartItems]);

  // Update Item Quantity in Cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Fetch Products
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch Cart Items
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);  // Update cart items
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get Cart Total Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find(product => product.id === items || product._id.toString() === items);
      if (!itemInfo) {
        console.warn(`Product with ID: ${items} not found in the product list`);
        continue;
      }
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  // Fetch products when the app loads
  useEffect(() => {
    getProductsData();
  }, []);

  // Fetch the user's cart when they log in
  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  // Handle login
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);  // Fetch cart immediately after login
    }
  }, []);

  // Handle logout
  const logout = () => {
    setCartItems({});  // Clear cart when logged out
    setCartCount(0);   // Reset cart count
    setToken('');
    localStorage.removeItem('token');
    toast.success("Logged out successfully");
    navigate('/login');
  };

  const value = {
    products, 
    currency, 
    delivery_fee, 
    search, 
    setSearch, 
    showSearch, 
    setShowSearch,
    cartItems, 
    addToCart, 
    updateQuantity,
    getCartCount: () => cartCount,  // Use cartCount state
    getCartAmount, 
    navigate, 
    setCartItems,
    backendUrl, 
    setToken, 
    token,
    logout  // Logout handler
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;



// import { createContext, useEffect, useState } from "react";
// // import { products } from "../assets/assets";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"






// export const ShopContext = createContext();

// const ShopContextProvider = (props)=>{

//     const currency ='NRs ';
//     const delivery_fee = 10;
    
//     const backendUrl = import.meta.env.VITE_BACKEND_URL
//     const [search, setSearch] = useState('');
//     const [showSearch, setShowSearch] = useState(false);
//     const [cartItems, setCartItems] = useState({});
//     const [products, setProducts] = useState([]);
//     const [token, setToken] = useState('');
//     const navigate = useNavigate();


//     const addToCart = async (itemId, size)=>{

//         if(!size){
//             toast.error('Select Product Size');
//             return;
//         }

//         let cartData = structuredClone(cartItems);
//         if (cartData[itemId]) {
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] +=1;
                
//             }
//             else{
//                 cartData[itemId][size] = 1;
//             }
            
//         }
//         else{
//             cartData[itemId]={};
//             cartData[itemId][size] = 1;
//         }
//         setCartItems(cartData);

//         if (token) {
//             try {
//                 const userId = localStorage.getItem("userId"); 
//                 await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers:{token}})
//                 toast.success("Product added to cart");
//             } catch (error) {
//                 console.log(error);
//                 toast.error(error.message)
//             }
//         }

//     }

//     const getCartCount = ()=> {
//         let totalCount = 0;
//         for (const items in cartItems){
//             for( const item in cartItems[items]){
//                 try {
//                     if (cartItems[items][item]>0) {
//                         totalCount += cartItems[items][item];
                        
//                     }
                    
//                 } catch (error) {
                    
//                 }
//             }
//         }

//         return totalCount;
//     }
//     const updateQuantity = async (itemId, size, quantity) =>{

//         let cartData = structuredClone(cartItems);
//         cartData[itemId][size] = quantity;
//         setCartItems(cartData);

//         if (token) {
//             try {
//                 const userId = localStorage.getItem("userId");
//                 await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers:{token}})
//             } catch (error) {
//                 console.log(error)
//             toast.error(error.message)
//             }
//         }

        
//     }

//     useEffect(()=>{
//         console.log(cartItems);
//     }, [cartItems])

 

    
//     const getProductsData = async () => {
//         try {
            
//             const response = await axios.get(backendUrl + '/api/product/list')

//            if (response.data.success) {
//             console.log("Products fetched from server:", response.data.products); // Check the products
//             setProducts(response.data.products)
            
//            }else {
//             toast.error(response.data.message)
//            }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
            
//         }
//     }

    
//     const getUserCart =  async (token)=> {
//         try {
//             const userId = localStorage.getItem("userId"); 
//             const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})

//             if (response.data.success) {
//                 setCartItems(response.data.cartData)
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }
//     const getCartAmount =  ()  => {
//         let totalAmount = 0;
//         for (const items in cartItems){
         
//             //let itemInfo = products.find((product)=>product.id === items);
//              let itemInfo = products.find((product) => product.id === items || product._id.toString() === items);

//             if (!itemInfo) {
//                 // If product is not found, continue to the next item
//                 console.warn(`Product with ID: ${items} not found in the product list`);
//                 continue;
//             }
            
//             for(const  item in cartItems[items]){
                
//                 try {
//                     if (cartItems[items][item]>0){
//                         totalAmount += itemInfo.price * cartItems[items][item];
                        
//                     }
//                 } catch (error) {
//                     console.log(error)
//             toast.error(error.message)
//                 }
//             }
//         }
//         return totalAmount;
        
//     }

//     useEffect(()=>{
//         getProductsData()
//     }, [])

//     useEffect(()=>{
//         if (!token && localStorage.getItem('token')) {
//             setToken(localStorage.getItem('token'))
//             getUserCart(localStorage.getItem('token'))            
//         }
//     },[])


//     const value = {
//        products, currency, delivery_fee, 
//        search,setSearch,showSearch, setShowSearch,
//        cartItems, addToCart,
//        getCartCount, updateQuantity,
//        getCartAmount, navigate, setCartItems,
//     backendUrl, setToken, token

//     }

//     return(
//         <ShopContext.Provider value={value}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider