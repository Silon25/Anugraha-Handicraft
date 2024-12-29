import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import weaving from '../assets/weaving.jpg'

const About = () => {
  return (
    <div>
      <div className='  text-2xl text-center pt-8 border-t'>
        <Title  text1={'ABOUT'} text2={'US'} />
        </div>
        <div className='my-5 flex flex-col md:flex-row gap-16 '>
          <img className='w-full h-[400px] md:max-w-[450px]' src={weaving} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Anugraha Handicraft is a Nepali brand dedicated to creating high-quality, handmade Dhaka clothing and accessories. Each piece reflects traditional Nepali craftsmanship, blending vibrant patterns and cultural significance. The brand's mission goes beyond fashion.</p>
          <p>We produce quality handmade Dhaka clothes with the aim to promote self-employment in Nepal.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>1.	Production of quality dhaka clothes according to the customer’s wishes and demand of the market.<br/>
2.	To provide skill training according to the customer’s wishes and demand of the market to make self-employment as well as entrepreneur. <br/>
3.	To provide opportunities in Nepal for sisters and women who are planning to go to abroad as well as who came from abroad.<br/>
4.	 To develop unique designs in cloth weaving.
</p>

          </div>

        </div>
        <div className='text-xl py-4'>
          <Title text1={'WHY'}  text2={'CHOOSE US'}/>

        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'> At Anugraha Handicraft, every product is crafted with meticulous attention to detail. From selecting the finest fabrics to employing skilled artisans, we ensure each piece represents the authenticity and elegance of traditional Nepali craftsmanship. Our commitment to quality guarantees long-lasting, premium products for our customers.</p>


          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'> Our user-friendly online platform allows customers to browse, customize, and order their favorite handmade Dhaka products from the comfort of their homes. With clear navigation, secure payment options, and fast delivery, we strive to make your shopping experience seamless and enjoyable.</p>
          </div>

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'> At Anugraha Handicraft, we value our customers and aim to provide exceptional support at every step. Our dedicated team is ready to assist with queries, customization requests, and after-sales services, ensuring a satisfying and memorable experience with every purchase.</p>
          </div>

        </div>
        
        <NewsletterBox/>
      
      
    </div>
  )
}

export default About
