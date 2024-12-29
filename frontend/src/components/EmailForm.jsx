import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

const EmailForm = () => {

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
    <form onSubmit={handleSubmit} className='emailForm'>
        <input 
        type='text'
        placeholder='Your Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input 
        type='email'
        placeholder='Your Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
        cols='30'
        rows='10'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type='submit'>Send Email</button>

    </form>
  )
}

export default EmailForm
