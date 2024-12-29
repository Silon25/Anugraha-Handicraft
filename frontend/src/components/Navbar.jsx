


import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import ah_logo from '../assets/ahlogo.png'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visibie,setVisible] =useState(false);
    const {setShowSearch, getCartCount, navigate, token , setToken, setCartItems} = useContext(ShopContext);

    const logout = ()=> {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        
    }

  return (
   
    <div className=' flex items-center justify-between py-5 font-medium'>  

     <Link to='/'>
   
        <img src={ah_logo}  className='w-15 h-10' alt="" />
        {/* <img src={assets.logo}  className='w-36' alt="" /> */}
    
    </Link> 



<ul className= 'hidden sm:flex gap-5 text-sm  text-gray-700 '>
    
    <NavLink to='/' className='flex flex-col items-center gap-1'>
    <p>HOME</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
    <NavLink to='/collection' className='flex flex-col items-center gap-1'>
    <p>COLLECTION</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
    <NavLink to='/about' className='flex flex-col items-center gap-1'>
    <p>ABOUT</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
    <NavLink to='/contact' className='flex flex-col items-center gap-1'>
    <p>CONTACT</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
    <NavLink to='/custom' className='flex flex-col items-center gap-1'>
    <p>CUSTOM</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
    

</ul>


<div className='flex items-center gap-6'>
    <img onClick={()=>setShowSearch(true)} className='w-5 cursor-pointer' src={assets.search_icon} alt="" />

    <div className='group relative'>
      <img onClick={()=> token ? null : navigate('/login')} className= 'w-5 cursor-pointer' src={assets.profile_icon} alt="" />
        
        {/* Drodown Menu */}

        {token && 
        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                {/* <p onClick={()=>navigate('/myprofile')} className='cursor-pointer hover:text-black'> My Profile </p> */}
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div> 

        </div>}

    </div>
    <Link to ='/cart' className='relative' >
    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>{getCartCount()}</p>

    </Link>
    <img onClick={()=>setVisible(true)} src= {assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" /> 

    {/* Sidebar menu for small screens */}

    <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all  ${visibie ? 'w-full': 'w-0' }  `}>

    <div className='flex flex-col text-gray-600' >

        <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>

            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                <p> Back</p>

        </div>

        <NavLink onClick={()=>setVisible(false)} className= 'py-2 pl-6 border' to='/'>HOME</NavLink>
        <NavLink onClick={()=>setVisible(false)} className= 'py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
        <NavLink onClick={()=>setVisible(false)} className= 'py-2 pl-6 border' to='/about'>ABOUT</NavLink>
        <NavLink onClick={()=>setVisible(false)} className= 'py-2 pl-6 border' to='/contact'>CONTACT</NavLink>      
        <NavLink onClick={()=>setVisible(false)} className= 'py-2 pl-6 border' to='/custom'>CUSTOM</NavLink>
        
    </div>

</div>


</div>
</div>

  )

}

export default Navbar


// Navbar visible even after scrolling down.

// import React, { useContext, useState, useEffect } from 'react';
// import { assets } from '../assets/assets';
// import { Link, NavLink } from 'react-router-dom';
// import ah_logo from '../assets/ahlogo.png';
// import { ShopContext } from '../context/ShopContext';

// const Navbar = () => {
//   const [visible, setVisible] = useState(true);
//   const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

//   let inactivityTimeout = null;

//   const logout = () => {
//     navigate('/login');
//     localStorage.removeItem('token');
//     setToken('');
//     setCartItems({});
//   };

//   const handleActivity = () => {
//     // Always keep the navbar visible when the user is at the very top of the page
//     if (window.scrollY === 0) {
//       setVisible(true);
//       return; // Prevent the navbar from disappearing at the top
//     }

//     setVisible(true);

//     // Clear any existing inactivity timeout
//     if (inactivityTimeout) {
//       clearTimeout(inactivityTimeout);
//     }

//     // Hide the navbar after 3 seconds of inactivity, but only if not at the top
//     inactivityTimeout = setTimeout(() => {
//       setVisible(false);
//     }, 3000); // 3 seconds of inactivity
//   };

//   useEffect(() => {
//     // Add event listeners to track scroll and mouse movements
//     window.addEventListener('scroll', handleActivity);
//     window.addEventListener('mousemove', handleActivity);
//     window.addEventListener('touchstart', handleActivity); // For mobile devices

//     // Cleanup event listeners on component unmount
//     return () => {
//       window.removeEventListener('scroll', handleActivity);
//       window.removeEventListener('mousemove', handleActivity);
//       window.removeEventListener('touchstart', handleActivity);
//       clearTimeout(inactivityTimeout);
//     };
//   }, []);

//   return (
//     <div className={`fixed top-0 left-0 w-full py-5 font-medium z-50 transition-transform ${visible ? 'translate-y-0' : '-translate-y-full'} bg-white shadow-lg`}>
//       <div className='flex items-center justify-between px-8'>
//         <Link to='/'>
//           <img src={ah_logo} className='w-15 h-9' alt="Logo" />
//         </Link>

//         <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
//           <NavLink to='/' className='flex flex-col items-center gap-1'>HOME</NavLink>
//           <NavLink to='/collection' className='flex flex-col items-center gap-1'>COLLECTION</NavLink>
//           <NavLink to='/about' className='flex flex-col items-center gap-1'>ABOUT</NavLink>
//           <NavLink to='/contact' className='flex flex-col items-center gap-1'>CONTACT</NavLink>
//           <NavLink to='/custom' className='flex flex-col items-center gap-1'>CUSTOM</NavLink>
//         </ul>

//         <div className='flex items-center gap-6'>
//           <img onClick={() => setShowSearch(true)} className='w-5 cursor-pointer' src={assets.search_icon} alt="Search" />
//           <div className='group relative'>
//             <img onClick={() => (token ? null : navigate('/login'))} className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile" />

//             {token && (
//               <div className='group-hover:block hidden absolute right-0 pt-4'>
//                 <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
//                   <p onClick={() => navigate('/myprofile')} className='cursor-pointer hover:text-black'> My Profile </p>
//                   <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
//                   <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <Link to='/cart' className='relative'>
//             <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
//             <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
//           </Link>

//           <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;