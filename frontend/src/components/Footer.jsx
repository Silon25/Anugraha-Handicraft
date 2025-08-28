import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import ahlogo from '../assets/ahlogo.png';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* <div>
          <img src={ahlogo} className='mb-5 w-32' alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>
            We produce quality handmade Dhaka clothes with the aim to promote self-employment in Nepal.

Anugraha Handicraft is a Nepali brand dedicated to creating high-quality, handmade Dhaka clothing and accessories. Each piece reflects traditional Nepali craftsmanship, blending vibrant patterns and cultural significance. The brand's mission goes beyond fashion.
          </p>
        </div> */}

<div className="flex flex-col md:flex-row items-start gap-5">
  <img src={ahlogo} className="mb-5 w-32 md:w-40" alt="" />
  <p className="text-gray-600 md:w-2/3">
    We produce quality handmade Dhaka clothes with the aim to promote self-employment in Nepal.
    <br /><br />
    Anugraha Handicraft is a Nepali brand dedicated to creating high-quality, handmade Dhaka clothing and accessories. Each piece reflects traditional Nepali craftsmanship, blending vibrant patterns and cultural significance. The brand's mission goes beyond fashion.
  </p>
</div>


        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Customize</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>9849124491</li>
            <li>anugrahahandicraft@gmail.com</li>
            <li className='flex gap-4 mt-2'>
              <a href="https://www.facebook.com/anugrahahandicraft" target="_blank" rel="noopener noreferrer" className='text-gray-600'>
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/anugraha_handicraft" target="_blank" rel="noopener noreferrer" className='text-gray-600'>
                <FaInstagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@anugraha_handicraft" target="_blank" rel="noopener noreferrer" className='text-gray-600'>
                <FaTiktok size={20} />
              </a>
              <a href="https://www.youtube.com/@anugrahhandicraft6832" target="_blank" rel="noopener noreferrer" className='text-gray-600'>
                <FaYoutube size={20} />
              </a>
            </li>
          </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'> Copyright 2025 © Anugraha Handicraft - All Rights Reserved.</p>
      </div>

    </div>
  );
}

export default Footer;

