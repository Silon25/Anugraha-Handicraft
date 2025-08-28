import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; // Core slick styles
import "slick-carousel/slick/slick-theme.css"; // Theme styles
import Dictaphone from './context/Dictaphone';
import Custom from './pages/Custom';
import MyProfile from './pages/MyProfile';

// Loading Screen Component with Animation
const LoadingScreen = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4); // Cycle through 0, 1, 2, 3 for dots
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
        <p className="text-gray-700 text-xl font-semibold">
          Welcome to Anugraha Handicraft
          {'.'.repeat(dotCount)}
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const location = useLocation(); // Get the current route
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited'); // Check if the user has visited
    if (!hasVisited) {
      setLoading(true);
      localStorage.setItem('hasVisited', 'true'); // Mark as visited
      const timer = setTimeout(() => {
        setLoading(false); // Disable loading after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer position="top-left" />
      <Navbar />
      <Dictaphone />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/custom' element={<Custom />} />
        <Route path='/myprofile' element={<MyProfile />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;






