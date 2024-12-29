import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { saveAs } from 'file-saver';  // For saving files
import * as XLSX from 'xlsx'; // XLSX for Excel export
import jsPDF from 'jspdf'; // jsPDF for PDF export
import 'jspdf-autotable'; // For table formatting in PDF
import excel from '../assets/excel.png'
import pdf from '../assets/pdf.png'
import printer from '../assets/printer.png'

const Orders = ({ token }) => {
  const [groupedOrders, setGroupedOrders] = useState({});
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: '',
    sortBy: '',
  });

  const handlePrint = () => {
    window.print();  // Opens the print dialog
  };

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const ordersByCustomer = {};
        response.data.orders.forEach((order) => {
          if (!ordersByCustomer[order.userId]) {
            ordersByCustomer[order.userId] = [];
          }
          ordersByCustomer[order.userId].push(order);
        });

        setGroupedOrders(ordersByCustomer);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: newStatus },
        // { orderId, status: event.target.value },
        { headers: { token } }
      );


      if (response.data.success) {
        await fetchAllOrders();

        // Get order details for email
      // const updatedOrder = response.data.updatedOrder; // Adjust based on your API response structure
      // console.log(updatedOrder)
      //  const customer = updatedOrder.street;

      // Email data for EmailJS
      // const emailData = {
      //   to_name: `${customer.firstName} ${customer.lastName}`,
      //   to_email: customer.email,
      //   order_details: updatedOrder.items
      //     .map((item) => `${item.name} (Size: ${item.size}, Quantity: ${item.quantity})`)
      //     .join(', '),
      //   total_amount: updatedOrder.amount,
      //   status: newStatus,
      // };

      // // Send email using EmailJS
      // const serviceId = 'service_pan993s'; // Replace with your EmailJS service ID
      // const templateId = 'template_woa6e55'; // Replace with your EmailJS template ID
      // const publicKey = 'h4K6ywGeZu0wgf8_3'; // Replace with your EmailJS user ID

      // emailjs
      //   .send(serviceId, templateId, emailData, publicKey)
      //   .then(() => {
      //     toast.success(`Email sent to ${customer.email} for status update: ${newStatus}`);
      //   })
      //   .catch((error) => {
      //     console.error('Error sending email:', error);
      //     toast.error('Failed to send status update email.');
      //   });

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Apply filters to the orders
  const filteredOrders = Object.entries(groupedOrders).reduce((acc, [userId, orders]) => {
    const filtered = orders.filter((order) => {
      const matchStatus = filters.status === '' || order.status === filters.status;
      const matchStartDate = !filters.startDate || new Date(order.date) >= new Date(filters.startDate);
      const matchEndDate = !filters.endDate || new Date(order.date) <= new Date(filters.endDate);
      return matchStatus && matchStartDate && matchEndDate;
    });

    if (filtered.length > 0) acc[userId] = filtered;
    return acc;
  }, {});

  // Sort function
  const sortOrders = (orders, key) => {
    return [...orders].sort((a, b) => {
      if (key === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (key === 'price') {
        return a.amount - b.amount;
      } else if (key === 'products') {
        return a.items.length - b.items.length;
      }
      return 0;
    });
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  // Export to XLSX function
  const exportToExcel = () => {
    const orders = Object.values(filteredOrders).flat();

    const worksheetData = [
      ["Customer Name", "Address", "Phone Number", "Order Date", "Order Amount", "Payment Status", "Order Status", "Product Details"],  // Headers
      ...orders.map(order => {
        const customer = order.address;
        const fullAddress = `${customer.street}, ${customer.city}, ${customer.state}, ${customer.country}, ${customer.zipcode}`; // Combine address fields
        const productDetails = order.items.map(i => `${i.name} (${i.quantity})`).join('; '); // Concatenate product details

        return [
          `${customer.firstName} ${customer.lastName}`,
          fullAddress,
          customer.phone,
          new Date(order.date).toLocaleDateString(),
          order.amount,
          order.payment ? 'Done' : 'Pending',
          order.status,
          productDetails
        ];
      })
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();
    const orders = Object.values(filteredOrders).flat();

    const tableColumn = ["Customer Name", "Address", "Phone Number", "Order Date", "Order Amount", "Payment Status", "Order Status", "Product Details"];
    const tableRows = orders.map(order => {
      const customer = order.address;
      const fullAddress = `${customer.street}, ${customer.city}, ${customer.state}, ${customer.country}, ${customer.zipcode}`; // Combine address fields
      const productDetails = order.items.map(i => `${i.name} (${i.quantity})`).join('; '); // Concatenate product details

      return [
        `${customer.firstName} ${customer.lastName}`,
        fullAddress,
        customer.phone,
        new Date(order.date).toLocaleDateString(),
        order.amount,
        order.payment ? 'Done' : 'Pending',
        order.status,
        productDetails
      ];
    });

    // Add a table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows
    });

    doc.save('orders.pdf');
  };

  return (
    <div>
      <h3>Order Page</h3>

      {/* Filters */}
      <div className="mb-4 flex-auto">
        <label>Status: </label>
        <select name="status" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>

        <label>Start Date: </label>
        <input type="date" name="startDate" onChange={handleFilterChange} />

        <label>End Date: </label>
        <input type="date" name="endDate" onChange={handleFilterChange} />

        {/* <label>Sort by: </label>
        <select name="sortBy" onChange={handleSortChange}>
          <option value="">None</option>
          <option value="date">Date</option>
          <option value="price">Price</option>
          <option value="products">Number of Products</option>
        </select> */}
      </div>

        {/* Export to Excel and PDF */}
        <div className="flex flex-row-reverse mb-4">
          <button onClick={exportToExcel} className="btn btn-primary mx-2">
            <img src={excel} alt="Export to Excel" style={{ width: '24px', marginRight: '8px' }} /> 
          </button>

          <button onClick={exportToPDF} className="btn btn-primary mx-2">
            <img src={pdf} alt="Export to PDF" style={{ width: '24px', marginRight: '8px' }} />   
          </button>

          <button onClick={handlePrint} className="btn btn-primary mx-2">
          <img src={printer} alt="Print" style={{ width: '24px', marginRight: '8px' }} /> 
        </button>

        </div>

      <div>
        {Object.entries(filteredOrders).map(([userId, orders]) => (
          <div key={userId} className="border-2 border-gray-200 p-5 my-3">
            {/* Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start">
              <img className="w-12" src={assets.parcel_icon} alt="" />
              <div>
                <p>Customer: {orders[0].address.firstName} {orders[0].address.lastName}</p>
                <p>Address: {orders[0].address.street}, {orders[0].address.city}</p>
                <p>Phone: {orders[0].address.phone}</p>
              </div>
              <div>
                <p>Total Orders: {orders.length}</p>
                <p>Latest Order Date: {new Date(orders[orders.length - 1].date).toLocaleDateString()}</p>
              </div>
              <p>{currency}{orders.reduce((acc, order) => acc + order.amount, 0)}</p>
              <select onChange={(event) => statusHandler(event, orders[orders.length - 1]._id)} value={orders[orders.length - 1].status} className="p-2 font-semibold">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Display Orders */}
            <div className="mt-3">
              {sortOrders(orders, filters.sortBy).map((order, index) => (
                <div key={index} className="py-2 border-t">
                  <p>Order #{index + 1}</p>
                  {order.items.map((item, i) => (
                    <p key={i}>{item.name} x {item.quantity} ({item.size})</p>
                  ))}
                  <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { backendUrl, currency } from '../App';
// import { toast } from 'react-toastify';
// import { assets } from '../assets/assets';

// const Orders = ({ token }) => {
//   const [groupedOrders, setGroupedOrders] = useState({}); // Store grouped orders by customer

//   const fetchAllOrders = async () => {
//     if (!token) {
//       return null;
//     }

//     try {
//       const response = await axios.post(
//         backendUrl + '/api/order/list',
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         // Group orders by userId (customer)
//         const ordersByCustomer = {};
//         response.data.orders.forEach((order) => {
//           if (!ordersByCustomer[order.userId]) {
//             ordersByCustomer[order.userId] = [];
//           }
//           ordersByCustomer[order.userId].push(order);
//         });

//         setGroupedOrders(ordersByCustomer); // Update the state with grouped orders
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/order/status',
//         { orderId, status: event.target.value },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         await fetchAllOrders(); // Fetch orders again to reflect the status change
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {Object.entries(groupedOrders).map(([userId, orders], index) => (
//           <div key={userId} className="border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
//             {/* Display Customer Info */}
//             <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start">
//               <img className="w-12" src={assets.parcel_icon} alt="" />
//               <div>
//                 <p className="font-medium">Customer: {orders[0].address.firstName} {orders[0].address.lastName}</p>
//                 <p>{"Address: " + orders[0].address.street + ", " + orders[0].address.city + ", " + orders[0].address.state + ", " + orders[0].address.country + ", " + orders[0].address.zipcode}</p>
//                 <p>Phone: {orders[0].address.phone}</p>
//               </div>
//               <div>
//                 <p>Total Orders: {orders.length}</p>
                
//                 <p>Latest Order Date: {new Date(orders[orders.length - 1].date).toLocaleDateString()}</p>
                
//               </div>
//               <p className="text-sm sm:text-[15px]">{currency}{orders.reduce((acc, order) => acc + order.amount, 0)}</p>
//               <select onChange={(event) => statusHandler(event, orders[orders.length - 1]._id)} value={orders[orders.length - 1].status} className="p-2 font-semibold">
//                 <option value="Order Placed">Order Placed</option>
//                 <option value="Packing">Packing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Out For Delivery">Out For Delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>

//             {/* Display Orders List */}
//             <div className="mt-3">
//               {orders.map((order, index) => (
//                 <div key={index} className="py-2 border-t">
//                   <div>
//                     <p className="font-medium">Order #{index + 1}</p>
//                     {order.items.map((item, index) => (
//                       <p key={index} className="py-0.5">
//                         {item.name} x {item.quantity} ({item.size})
//                       </p>
//                     ))}
//                     <p className="mt-1">Payment: {order.payment ? 'Done' : 'Pending'}</p>
//                     <p>Date: {new Date(order.date).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;


// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     if (!token) {
//       return null;
//     }

//     try {
//       const response = await axios.post(
//         backendUrl + "/api/order/list",
//         {},
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         setOrders(response.data.orders);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(response.data.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   const statusHandler = async (event, orderId) =>{
//     try {
      
//       const response = await axios.post(backendUrl + '/api/order/status', {orderId, status: event.target.value}, {headers:{token}})

//       if (response.data.success) {
//         await fetchAllOrders()
        
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(response.data.message)
//     }
//   }

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {orders.map((order, index) => (
//           <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
//             <img className="w-12" src={assets.parcel_icon} alt="" />
//             <div>
//               <div>
//                 {order.items.map((item, index) => {
//                   if (index === order.items.length - 1) {
//                     return (
//                       <p className="py-0.5" key={index}>
//                         {item.name} x {item.quantity} <span>{item.size}</span>
//                       </p>
//                     );
//                   } else {
//                     return (
//                       <p className="py-0.5" key={index}>
//                         {item.name} x {item.quantity} <span>{item.size}</span>,{" "}
//                       </p>
//                     );
//                   }
//                 })}
//               </div>
//               <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>

//               <div>
//                 <p>{"Address: "+ order.address.street + ","}</p>
//                 <p>
                  
//                   { order.address.city +
//                     ", " +
//                     order.address.state +
//                     ", " +
//                     order.address.country +
//                     ", " +
//                     order.address.zipcode}
//                 </p>
//                 {/* <p>
                  
//                   { "City: "+order.address.city +
//                     ", " +
//                     "State: "+order.address.state +
//                     ", " +
//                     "Country: "+order.address.country +
//                     ", " +
//                     "Zipcode: "+order.address.zipcode}
//                 </p> */}
//               </div>
//               <p> {order.address.phone}</p>
//             </div>

//             <div>
//               <p  className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
//               <p className="mt-3">Method : {order.paymentMethod}</p>
//               <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
//               <p>Date : {new Date(order.date).toLocaleDateString()}</p> //order placed
//             </div>
//             <p className="text-sm sm:text-[15px]" >{currency}{order.amount}</p>
//             <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold" >
//               <option value="Order Placed">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out For Delivery">Out For Delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
