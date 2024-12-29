import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            Near Hope College <br /> Tikhedewal, Lalitpur <br /> (Google Map below)
          </p>
          <p className="text-gray-500">
            Tel: (+977) 9849124491 <br /> Email: anugrahahandicraft@gmail.com
          </p>
          {/* <p className="font-semibold text-xl text-gray-600">Careers at Anugraha Handicraft</p>
          <p className="text-gray-500">Learn More about our team and job openings</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button> */}
        </div>
      </div>

      {/* Embed Google Maps */}
      <div className="w-full h-[400px] flex justify-center items-center mb-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12195.923343417!2d85.31864542389975!3d27.659150154355657!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb17f116237b2d%3A0xfda3d13216d26b2f!2sAnugraha%20Handicraft!5e0!3m2!1sen!2snp!4v1732159235782!5m2!1sen!2snp"
          title="Anugraha Handicraft Location"
          className="w-full h-full max-w-[960px] rounded-md border"
          allowFullScreen
          loading="lazy"
        ></iframe>
        
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;


// import React from 'react'
// import Title from '../components/Title'
// import { assets } from '../assets/assets'
// import NewsletterBox from '../components/NewsletterBox'
// import EmailForm from '../components/EmailForm'


// const Contact = () => {
//   return (
//     <div>

//       <div className='text-center text-2xl pt-10 border-t'>
//         <Title text1={'CONTACT'} text2={'US'}/>

//       </div>
//       <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
//         <img className='w-ful md:max-w-[480px]' src={assets.contact_img} alt="" /> 
//         <div className='flex flex-col justify-center items-start gap-6'>
//           <p className='font-semibold text-xl text-gray-60'>Our Store</p>
//           <p className='text-gray-500'> Near Hope College <br /> Tikhedewal, Lalitpur</p>
//           <p className='text-gray-500'>Tel: (+977) 9849124491 <br /> Email: anugrahahandicraft@gmail.com</p>
//           <p className='font-semibold text-xl text-gray-600'> Carrers at Anugraha Handicraft</p>
//           <p className='text-gray-500'> Learn More about our team and job openings</p>
//           <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>

//           {/* <p></p> */}

//         </div>

//       </div>

      
// <NewsletterBox />
//       {/* <EmailForm/> */}
//     </div>
//   )
// }

// export default Contact
