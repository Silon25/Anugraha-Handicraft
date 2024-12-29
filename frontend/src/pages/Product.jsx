import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

// Customize
import { CustomButton } from '../components/Customize';

const Product = () => {

  const {productId} = useParams();
  // console.log(productId);
  const {products, currency, addToCart, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] =useState('');

  const fetchProductData = async ()=>{

    products.map((item)=>{

      if (item._id === productId) {
        setProductData(item)
        // console.log(item);
        setImage(item.image[0])
        console.log(item);
        return null;
        
      }

    })

  }

  useEffect(()=>{
    fetchProductData();
  }, [productId, products])

  return productData ?  (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>


    {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'> 
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
             {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} 
                // className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer h-[100px] object-cover' 
                className='w-[100px] h-[100px] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-cover' // Adjusted here
                // style={{ width: "100px", height: "100px", objectFit: "cover" }}
                alt="" />
              ))
             }

          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-90%' src={image} alt="" />
            {/* <img 
      className='w-full h-[400px] object-cover' // Updated here
      src={image} 
      alt="" 
    /> */}

          </div>

        </div>

        {/* ---------------- Product Info ------------ */}

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)}  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key = {index}>{item}</button>
                ))
              }

            </div>


          </div>

          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr/>
          {/* <button onClick={()=>navigate('/custom')} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Customize</button> */}
          
           {/* ----- Customize button ------- */}
          {/* <CustomButton 
          type="filled" 
          title="Customize It"
          handleClick={()=>navigate('/custom')}
          customStyles = 'w-fit px-4 py-2.5 font-bold text-sm'
          /> */}

          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>

            <p> 100% Handmade Product</p>
            <p> Cash on delivery is available for this product</p>
            <p>Easy return and exchange policy within 7 days</p>

          </div>

          

        </div>

              </div>
              {/* Description and review section */}

          <div className='mt-20'>
            <div className='flex'>
              <b className='border px-5 py-3 text-sm'> Description</b>
              <p className='border px-5 py-3 text-sm'> Reviews (122)</p>

            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>Nepali Dhaka clothing is a traditional handwoven textile unique to Nepal, known for its vibrant patterns and geometric designs. Dhaka fabric is often used to make garments like the **"topi"** (a traditional cap) and **"gunyo cholo"** (women’s attire). Worn during festivals, celebrations, and cultural events, Dhaka represents Nepal's rich heritage and craftsmanship, with each piece symbolizing the nation's cultural identity. The fabric is still woven by hand in many parts of Nepal, preserving its authenticity and historical significance. </p>
              <p > Handmade Dhaka clothing is a traditional Nepali textile renowned for its intricate, handwoven patterns and vibrant colors. Created on a loom by skilled artisans, Dhaka fabric is used to make a variety of clothing items, such as the **Nepali topi** (hat), **gunyo cholo** (women's traditional dress), shawls, and scarves. Each piece of Dhaka cloth is crafted with attention to detail, often taking days or weeks to complete, symbolizing craftsmanship and cultural pride. Dhaka clothing is worn during special occasions, festivals, and ceremonies, representing Nepal’s rich heritage and artisanal tradition.</p>

              

            </div>

          </div>

          {/* Display related products */}
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

      
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
