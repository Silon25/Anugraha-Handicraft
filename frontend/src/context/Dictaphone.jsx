

// import React, { useState } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const Dictaphone = () => {
//   const commands = [
//     {
//       command: ["Go to * page", "Open *"],
//       callback: (redirectPage) => setRedirectUrl(redirectPage),
//     },
//     {
//       command: ["Enable microphone", "Start listening", "Activate microphone"],
//       callback: () => startListening(),
//     },
//     {
//       command: ["Disable microphone", "Stop listening", "Deactivate microphone"],
//       callback: () => stopListening(),
//     },
//   ];

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition({ commands });

//   const [redirectUrl, setRedirectUrl] = useState("");
//   const pages = ["home", "collection", "contact", "about", "login", "cart"];
//   const urls = {
//     home: '/',
//     collection: '/collection',
//     contact: '/contact',
//     about: '/about',
//     login: '/login',
//   };

//   const startListening = () => {
//     SpeechRecognition.startListening({continuous: true  });
//   };

//   const stopListening = () => {
//     SpeechRecognition.stopListening();
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   let redirect = "";
//   if (listening && redirectUrl) {
//     if (pages.includes(redirectUrl)) {
//       redirect = <Navigate to={urls[redirectUrl]} />;
//     } else {
//       redirect = <p>Could not find page: {redirectUrl}</p>;
//     }
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//       <button onClick={startListening}>Start</button>
//       <button onClick={stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//       {redirect}
//     </div>
//   );
// };

// export default Dictaphone;


// ------------ v2 ---------------------

// import React, { useState } from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// const Dictaphone = () => {
//   const commands = [
//     {
//       command: ["Go to * page", "Open *"],
//       callback: (redirectPage) => setRedirectUrl(redirectPage),
//     },
//     {
//       command: ["Enable microphone", "Start listening", "Activate microphone"],
//       callback: () => startListening(),
//     },
//     {
//       command: ["Disable microphone", "Stop listening", "Deactivate microphone"],
//       callback: () => stopListening(),
//     },
//   ];

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition({ commands });

//   const [redirectUrl, setRedirectUrl] = useState('');
//   const [isActive, setIsActive] = useState(false);
//   const pages = ['home', 'collection', 'contact', 'about', 'login', 'cart'];
//   const urls = {
//     home: '/',
//     collection: '/collection',
//     contact: '/contact',
//     about: '/about',
//     login: '/login',
//   };

//   const startListening = () => {
//     setIsActive(true);
//     setSearchQuery('Listening...');
//     SpeechRecognition.startListening({ continuous: true });
//   };

//   const stopListening = () => {
//     setIsActive(false);
//     SpeechRecognition.stopListening();
//   };

//   const toggleActive = () => {
//     setIsActive(!isActive);
//     if (!isActive) {
//       startListening();
//     } else {
//       stopListening();
//     }
//   };

//   const [searchQuery, setSearchQuery] = useState('');
//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   let redirect = '';
//   if (listening && redirectUrl) {
//     if (pages.includes(redirectUrl)) {
//       redirect = <Navigate to={urls[redirectUrl]} />;
//     } else {
//       redirect = <p>Could not find page: {redirectUrl}</p>;
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg">
//       <div className="p-6">
//         <div className="flex flex-col items-center space-y-4">
//           <button
//             className={`w-5  h-7  place-items-center  rounded-full transition-all duration-300 ${
//               isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//             }`}
//             onClick={toggleActive}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className={`w-5  h-5  text-white transition-all duration-300 ${
//                 isActive ? 'animate-pulse' : ''
//               }`}
//             >
//               <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//               <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//               <line x1="12" y1="19" x2="12" y2="23" />
//               <line x1="8" y1="23" x2="16" y2="23" />
//             </svg>
//           </button>
//           <div className="text-center">
//             <p className="text-lg font-semibold">{isActive ? 'Active' : 'Inactive'}</p>
//             <p className="text-sm text-gray-500">{searchQuery}</p>
//             <p>{transcript}</p>
//           </div>
//         </div>
//         <button onClick={resetTranscript} className="mt-4 bg-gray-200 p-2 rounded">
//           Reset Transcript
//         </button>
//         {redirect}
//       </div>
//     </div>
//   );
// };

// export default Dictaphone;



// ---------------------- v3 ------------------------


// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import reset_icon from '../assets/reset_icon.png';

// const Dictaphone = () => {
//   const commands = [
//     {
//       command: ["Go to * page", "Open *"],
//       callback: (redirectPage) => setRedirectUrl(redirectPage),
//     },
//     {
//       command: ["Enable microphone", "Start listening", "Activate microphone"],
//       callback: () => startListening(),
//     },
//     {
//       command: ["Disable microphone", "Stop listening", "Deactivate microphone"],
//       callback: () => stopListening(),
//     },
//   ];

//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
//   const [redirectUrl, setRedirectUrl] = useState('');
//   const [isActive, setIsActive] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const pages = ['home', 'collection', 'contact', 'about', 'login', 'cart'];
//   const urls = {
//     home: '/',
//     collection: '/collection',
//     contact: '/contact',
//     about: '/about',
//     login: '/login',
//   };

//   const startListening = () => {
//     setIsActive(true);
//     setSearchQuery('Listening...');
//     SpeechRecognition.startListening({ continuous: true });
//   };

//   const stopListening = () => {
//     setIsActive(false);
//     SpeechRecognition.stopListening();
//     resetTranscript();
//     setSearchQuery('');
//   };

//   const toggleActive = () => {
//     setIsActive(!isActive);
//     if (!isActive) {
//       startListening();
//     } else {
//       stopListening();
//       resetTranscript();
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   let redirect = '';
//   if (listening && redirectUrl) {
//     if (pages.includes(redirectUrl)) {
//       redirect = <Navigate to={urls[redirectUrl]} />;
//     } else {
//       redirect = <p>Could not find page: {redirectUrl}</p>;
//     }
//   }

//   return (
//     <div className="flex flex-col items-center  space-y-6">
//       {/* Buttons Container */}
//       <div className="flex items-center space-x-6">
//         {/* Microphone Button */}
//         <button
//           className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//             isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//           onClick={toggleActive}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className={`w-6 h-6 text-white transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}
//           >
//             <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//             <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//             <line x1="12" y1="19" x2="12" y2="23" />
//             <line x1="8" y1="23" x2="16" y2="23" />
//           </svg>
//         </button>

//         {/* Reset Button */}
//         <button
//           onClick={resetTranscript}
//           className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
//             isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//         >
//           <img className="w-6 h-6" src={reset_icon} alt="Reset" />
//         </button>
//       </div>

//       {/* Status and Transcript */}
//       <div className="text-center">
//         <p className="text-lg font-semibold">{isActive ? 'Active' : 'Inactive'}</p>
//         <p className="text-sm text-gray-500">{searchQuery}</p>
//         <p>{transcript}</p>
//         {redirect}
//       </div>
//     </div>
//   );
// };

// export default Dictaphone;

// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import reset_icon from '../assets/reset_icon.png';

// const Dictaphone = () => {
//   const commands = [
//     {
//       command: ["Go to * page", "Open *"],
//       callback: (redirectPage) => setRedirectUrl(redirectPage),
//     },
//     {
//       command: ["Enable microphone", "Start listening", "Activate microphone"],
//       callback: () => startListening(),
//     },
//     {
//       command: ["Disable microphone", "Stop listening", "Deactivate microphone"],
//       callback: () => stopListening(),
//     },
//   ];

//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
//   const [redirectUrl, setRedirectUrl] = useState('');
//   const [isActive, setIsActive] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const pages = ['home', 'collection', 'contact', 'about', 'login', 'cart'];
//   const urls = {
//     home: '/',
//     collection: '/collection',
//     contact: '/contact',
//     about: '/about',
//     login: '/login',
//   };

//   const startListening = () => {
//     setIsActive(true);
//     setSearchQuery('Listening...');
//     SpeechRecognition.startListening({ continuous: true });
//   };

//   const stopListening = () => {
//     setIsActive(false);
//     SpeechRecognition.stopListening();
//     resetTranscript();
//     setSearchQuery('');
//   };

//   const toggleActive = () => {
//     setIsActive(!isActive);
//     if (!isActive) {
//       startListening();
//     } else {
//       stopListening();
//       resetTranscript();
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   let redirect = '';
//   if (listening && redirectUrl) {
//     if (pages.includes(redirectUrl)) {
//       redirect = <Navigate to={urls[redirectUrl]} />;
//     } else {
//       redirect = <p>Could not find page: {redirectUrl}</p>;
//     }
//   }

//   return (
//     <div
//       className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-6"
//     >
//       {/* Buttons Container */}
//       <div className="flex items-center space-x-6">
//         {/* Microphone Button */}
//         <button
//           className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//             isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//           onClick={toggleActive}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className={`w-6 h-6 text-white transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}
//           >
//             <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//             <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//             <line x1="12" y1="19" x2="12" y2="23" />
//             <line x1="8" y1="23" x2="16" y2="23" />
//           </svg>
//         </button>

//         {/* Reset Button */}
//         <button
//           onClick={resetTranscript}
//           className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
//             isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//         >
//           <img className="w-6 h-6" src={reset_icon} alt="Reset" />
//         </button>
//       </div>

//       {/* Status and Transcript */}
//       <div className="text-center">
//         <p className="text-lg font-semibold">{isActive ? 'Active' : 'Inactive'}</p>
//         <p className="text-sm text-gray-500">{searchQuery}</p>
//         <p>{transcript}</p>
//         {redirect}
//       </div>
//     </div>
//   );
// };

// export default Dictaphone;


// --------------------- Changes -----------------------

// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import reset_icon from '../assets/reset_icon.png';

// const Dictaphone = () => {
//   const [redirectUrl, setRedirectUrl] = useState('');
//   const [isActive, setIsActive] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isDimmed, setIsDimmed] = useState(true); // Controls UI dimming when transcript is empty

//   const pages = ['home', 'collection', 'contact', 'about', 'login', 'cart'];
//   const urls = {
//     home: '/',
//     collection: '/collection',
//     contact: '/contact',
//     about: '/about',
//     login: '/login',
//   };

//   const commands = [
//     {
//       command: ["Go to * page", "Open *"],
//       callback: (redirectPage) => setRedirectUrl(redirectPage),
//     },
//     {
//       command: ["Enable microphone", "Start listening", "Activate microphone"],
//       callback: () => startListening(),
//     },
//     {
//       command: ["Disable microphone", "Stop listening", "Deactivate microphone"],
//       callback: () => stopListening(),
//     },
//     {
//       command: "reset",
//       callback: () => resetTranscript(),
//     },
//   ];

//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

//   useEffect(() => {
//     // Dim the UI when there's no transcript
//     setIsDimmed(transcript === '');

//     // Auto reset transcript if it's too long (one line on screen ~ 50 characters)
//     if (transcript.length > 50) {
//       resetTranscript();
//     }

//   }, [transcript]);

//   const startListening = () => {
//     setIsActive(true);
//     setSearchQuery('Listening...');
//     SpeechRecognition.startListening({ continuous: true });
//   };

//   const stopListening = () => {
//     setIsActive(false);
//     SpeechRecognition.stopListening();
//     resetTranscript();
//     setSearchQuery('');
//   };

//   const toggleActive = () => {
//     setIsActive(!isActive);
//     if (!isActive) {
//       startListening();
//     } else {
//       stopListening();
//       resetTranscript();
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   let redirect = '';
//   if (listening && redirectUrl) {
//     if (pages.includes(redirectUrl)) {
//       redirect = <Navigate to={urls[redirectUrl]} />;
//     } else {
//       redirect = <p>Could not find page: {redirectUrl}</p>;
//     }
//   }

//   return (
//     <div
//       className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-6 transition-opacity duration-300 ${isDimmed ? 'opacity-50' : 'opacity-100'}`}
//     >
//       {/* Buttons Container */}
//       <div className="flex items-center space-x-6">
//         {/* Microphone Button */}
//         <button
//           className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//             isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//           onClick={toggleActive}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className={`w-6 h-6 text-white transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}
//           >
//             <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//             <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//             <line x1="12" y1="19" x2="12" y2="23" />
//             <line x1="8" y1="23" x2="16" y2="23" />
//           </svg>
//         </button>

//         {/* Reset Button */}
//         <button
//           onClick={resetTranscript}
//           className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
//             isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//         >
//           <img className="w-6 h-6" src={reset_icon} alt="Reset" />
//         </button>
//       </div>

//       {/* Status and Transcript */}
//       <div className="text-center">
//         <p className="text-lg font-semibold">{isActive ? 'Active' : 'Inactive'}</p>
//         <p className="text-sm text-gray-500">{searchQuery}</p>
//         <p>{transcript}</p>
//         {redirect}
//       </div>
//     </div>
//   );
// };

// export default Dictaphone;


// --------------- Scroll up & down -------------------------

// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import reset_icon from '../assets/reset_icon.png';

// const Dictaphone = () => {
//   const [redirectUrl, setRedirectUrl] = useState('');
//   const [isActive, setIsActive] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isDimmed, setIsDimmed] = useState(true); // Controls UI dimming when transcript is empty
//   const [scrollFeedback, setScrollFeedback] = useState(null); // For showing scroll feedback

//   const pages = ['home', 'collection', 'contact', 'about', 'login', 'cart'];
//   const urls = {
//     home: '/',
//     collection: '/collection',
//     contact: '/contact',
//     about: '/about',
//     login: '/login',
//   };

//   const showScrollFeedback = (type) => {
//     setScrollFeedback(type);
//     setTimeout(() => setScrollFeedback(null), 1500); // Hide after 1.5 seconds
//   };

//   const commands = [
//     {
//       command: ["Go to * page", "Open *"],
//       callback: (redirectPage) => setRedirectUrl(redirectPage),
//     },
//     {
//       command: ["Enable microphone", "Start listening", "Activate microphone"],
//       callback: () => startListening(),
//     },
//     {
//       command: ["Disable microphone", "Stop listening", "Deactivate microphone"],
//       callback: () => stopListening(),
//     },
//     {
//       command: "reset",
//       callback: () => resetTranscript(),
//     },
//     {
//       command: "scroll down",
//       callback: () => {
//         window.scrollBy({ top: 300, behavior: 'smooth' });
//         showScrollFeedback('DOWN');
//       },
//     },
//     {
//       command: "scroll up",
//       callback: () => {
//         window.scrollBy({ top: -300, behavior: 'smooth' });
//         showScrollFeedback('UP');
//       },
//     },
//     {
//       command: "scroll to top",
//       callback: () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//         showScrollFeedback('UP');
//       },
//     },
//     {
//       command: "scroll to bottom",
//       callback: () => {
//         window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
//         showScrollFeedback('DOWN');
//       },
//     },
//   ];

//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

//   useEffect(() => {
//     // Dim the UI when there's no transcript
//     setIsDimmed(transcript === '');

//     // Auto reset transcript if it's too long (one line on screen ~ 50 characters)
//     if (transcript.length > 50) {
//       resetTranscript();
//     }
//   }, [transcript]);

//   const startListening = () => {
//     setIsActive(true);
//     setSearchQuery('Listening...');
//     SpeechRecognition.startListening({ continuous: true });
//   };

//   const stopListening = () => {
//     setIsActive(false);
//     SpeechRecognition.stopListening();
//     resetTranscript();
//     setSearchQuery('');
//   };

//   const toggleActive = () => {
//     setIsActive(!isActive);
//     if (!isActive) {
//       startListening();
//     } else {
//       stopListening();
//       resetTranscript();
//     }
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   let redirect = '';
//   if (listening && redirectUrl) {
//     if (pages.includes(redirectUrl)) {
//       redirect = <Navigate to={urls[redirectUrl]} />;
//     } else {
//       redirect = <p>Could not find page: {redirectUrl}</p>;
//     }
//   }

//   return (
//     <div
//       className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-6 transition-opacity duration-300 ${isDimmed ? 'opacity-50' : 'opacity-100'}`}
//     >
//       {/* Scroll Feedback UI */}
//       {scrollFeedback && (
//         <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-lg py-2 px-4 rounded-lg shadow-lg z-50">
//           {scrollFeedback === 'UP' ? '↑ UP SCROLL' : '↓ DOWN SCROLL'}
//         </div>
//       )}

//       {/* Buttons Container */}
//       <div className="flex items-center space-x-6">
//         {/* Microphone Button */}
//         <button
//           className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//             isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//           onClick={toggleActive}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className={`w-6 h-6 text-white transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}
//           >
//             <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//             <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//             <line x1="12" y1="19" x2="12" y2="23" />
//             <line x1="8" y1="23" x2="16" y2="23" />
//           </svg>
//         </button>

//         {/* Reset Button */}
//         <button
//           onClick={resetTranscript}
//           className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
//             isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//         >
//           <img className="w-6 h-6" src={reset_icon} alt="Reset" />
//         </button>
//       </div>

//       {/* Status and Transcript */}
//       <div className="text-center">
//         <p className="text-lg font-semibold">{isActive ? 'Active' : 'Inactive'}</p>
//         <p className="text-sm text-gray-500">{searchQuery}</p>
//         <p>{transcript}</p>
//         {redirect}
//       </div>
//     </div>
//   );
// };

// export default Dictaphone;



// -------- Microphone at side ----------------

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import reset_icon from '../assets/reset_icon.png';

const Dictaphone = () => {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDimmed, setIsDimmed] = useState(true); // Controls UI dimming when transcript is empty
  const [scrollFeedback, setScrollFeedback] = useState(null); // For showing scroll feedback

  const pages = ['home', 'collection', 'contact', 'about', 'login', 'cart', 'custom', 'orders'];
  const urls = {
    home: '/',
    collection: '/collection',
    contact: '/contact',
    about: '/about',
    login: '/login',
    custom: '/custom',
    cart:'/cart',
    orders: '/orders'
  };

  const showScrollFeedback = (type) => {
    setScrollFeedback(type);
    setTimeout(() => setScrollFeedback(null), 1500); // Hide after 1.5 seconds
  };

  const commands = [
    {
      command: ["Go to * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: ["Enable microphone", "Start listening", "Activate microphone"],
      callback: () => startListening(),
    },
    {
      command: ["Disable microphone", "Stop listening", "Deactivate microphone"],
      callback: () => stopListening(),
    },
    {
      command: "reset",
      callback: () => resetTranscript(),
    },
    {
      command:  ["down", "Scroll down", "go down"],
      callback: () => {
        window.scrollBy({ top: 300, behavior: 'smooth' });
        showScrollFeedback('DOWN');
      },
    },
    {
      command: ["up", "Scroll up", "go up"],
      callback: () => {
        window.scrollBy({ top: -300, behavior: 'smooth' });
        showScrollFeedback('UP');
      },
    },
    {
      command:["scroll to top",  "go to top"] ,
      callback: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showScrollFeedback('UP');
      },
    },
    {
      command: ["scroll to bottom", "go to bottom"],
      callback: () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        showScrollFeedback('DOWN');
      },
    },
  ];

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  useEffect(() => {
    // Dim the UI when there's no transcript
    setIsDimmed(transcript === '');

    // Auto reset transcript if it's too long (one line on screen ~ 50 characters)
    // if (transcript.length > 50) {
    //   resetTranscript();
    // }
  }, [transcript]);

  const startListening = () => {
    setIsActive(true);
    setSearchQuery('Listening...');
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsActive(false);
    SpeechRecognition.stopListening();
    resetTranscript();
    setSearchQuery('');
  };

  const toggleActive = () => {
    setIsActive(!isActive);
    if (!isActive) {
      startListening();
    } else {
      stopListening();
      resetTranscript();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  let redirect = '';
  if (listening && redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Navigate to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

  return (
    <>
      {/* Scroll Feedback UI */}
      {scrollFeedback && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-lg py-2 px-4 rounded-lg shadow-lg z-50">
          {scrollFeedback === 'UP' ? '↑ UP SCROLL' : '↓ DOWN SCROLL'}
        </div>
      )}

      <div
        className={`${
          isActive
            ? 'fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-6'
            : 'fixed bottom-4 left-4 z-50'
        } transition-all duration-500 ease-in-out`}
      >
        {/* Buttons Container */}
        <div className={`${isActive ? 'flex items-center space-x-6' : ''}`}>
          {/* Microphone Button */}
          <button
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={toggleActive}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-6 h-6 text-white transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>

          {/* Reset Button - Only visible when active */}
          {isActive && (
            <button
              onClick={resetTranscript}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              <img className="w-6 h-6" src={reset_icon} alt="Reset" />
            </button>
          )}
        </div>

        {/* Status and Transcript */}
        {isActive ? (
          <div className="text-center">
            <p className="text-lg font-semibold">Active</p>
            <p className="text-sm text-gray-500">{searchQuery}</p>
            <p>{transcript}</p>
            {redirect}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Inactive</p>
        )}
      </div>
    </>
  );
};

export default Dictaphone;

