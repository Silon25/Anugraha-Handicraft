// import 'regenerator-runtime/runtime';
// import React from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import Home from './pages/Home';
// import Collection from './pages/Collection';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Product from './pages/Product';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import PlaceOrder from './pages/PlaceOrder';
// import Orders from './pages/Orders';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import SearchBar from './components/SearchBar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // -------------- Speech recog ------------
// import Dictaphone from './context/Dictaphone';

// // ------------- Customization --------------
// import Custom from './pages/Custom';

// const App = () => {
//   const location = useLocation(); // Get the current route

//   // Check if the current path is '/custom'
//   const isCustomPage = location.pathname === '/custom';

//   return (
//     <main className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      

//       {/* Conditionally render the Navbar and SearchBar */}
//       {!isCustomPage && (
//         <>
//           <Navbar />
//           <Dictaphone/>
//           <SearchBar />
//         </>
//       )}

//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/collection' element={<Collection />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/product/:productId' element={<Product />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/place-order' element={<PlaceOrder />} />
//         <Route path='/orders' element={<Orders />} />
//         <Route path='/custom' element={<Custom />} />
//       </Routes>
//       <ToastContainer />
//       {/* Conditionally render the Footer */}
//       {!isCustomPage && <Footer />}

//     </main>
//   );
// };

// export default App;


import 'regenerator-runtime/runtime';
import React, { useState } from 'react'
import { Routes, Route,  Navigate, redirect, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// -------------- Speech recog ------------

import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import Dictaphone from './context/Dictaphone';


// ------------- Customization --------------


import Custom from './pages/Custom';
import CanvasModel from './canvas/Index';
import MyProfile from './pages/MyProfile';


const App = () => {

  const location = useLocation(); // Get the current route

  
  return (
    <main className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer position="top-left" />
      <Navbar/>
      <Dictaphone/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/custom' element={<Custom/>} />
        <Route path='/myprofile' element={<MyProfile/>} />
      </Routes>
     

    
     {/* Conditionally render CanvasModel if the path is '/custom' */}
     {/* {location.pathname === '/custom' && <CanvasModel />} */}
      
      
      <Footer/>

  
    </main>
  )
}

export default App


