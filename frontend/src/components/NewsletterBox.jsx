import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

const NewsletterBox = () => {

  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e)=> {
        e.preventDefault();


        // Keys
        const serviceId = 'service_pan993s';
        const templateId = 'template_3vb1cl5';
        const publicKey = 'h4K6ywGeZu0wgf8_3';


        // New Object
        const templateParams = {
            to_name: name,
            to_email: email,
            from_name: 'Silon',
            message: message,
            
        };

        //send mail EmailJs
        emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('Email sent successfully', response)
            setName('');
            setEmail('');
            setMessage('');
        })
        .catch((error) => {
            console.error('Error sending Email', error )
        });



    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 10% off</p>
        {/* <p className='text-gray-400 mt-3'> lorem epsu asndjna asdj n</p> */}
        <form  onSubmit = {handleSubmit}className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full sm:flex-1 outline-none' placeholder='Enter your email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsletterBox
