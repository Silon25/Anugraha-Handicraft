import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Navigate} from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import 'regenerator-runtime/runtime'
import Dictaphone from './context/Dictaphone.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter> 
 
  <ShopContextProvider>
    {/* <Dictaphone/> */}
    {/* {Dictaphone.redirect} */}
    {/* {redirect} */}
  <App />
  </ShopContextProvider>
  </BrowserRouter> ,
)
