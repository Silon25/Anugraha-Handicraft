import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const [searchMode, setSearchMode] = useState(false); // Controls when the search should be activated

  // Voice recognition setup with commands for 'search' and 'stop'
  const commands = [
    {
      command: 'search',
      callback: () => {
        setSearchMode(true);
        setShowSearch(true); // Ensure search bar is visible when voice search starts
        resetTranscript();
        setSearch(transcript); // Activate search mode and set the transcript as the search input
      },
    },
    {
      command:  ["stop search", "end search", "Disable microphone", "Stop listening", "Deactivate microphone" , "Deactivate search", "disable search"],
      callback: () => {
        setSearchMode(false);
        setShowSearch(false); // Hide search bar when voice search stops
        resetTranscript(); // Deactivate search mode and reset the transcript
        setSearch(''); // Clear the search input
      },
    },
    {
      command: [
        "clear search", 
        "remove search query", 
        "erase search", 
        "reset search bar"
      ],
      callback: () => {
        setSearch(''); // Clear the search input
        resetTranscript(); // Reset the transcript as well
      },
    },
  ];

  const { transcript, listening, resetTranscript } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true); // Make search bar visible on the 'collection' page
    } else {
      setVisible(false);
    }
  }, [location]);

  // Update search input only when 'search' mode is activated
  useEffect(() => {
    if (listening && searchMode) {
      setSearch(transcript);  // Update search value with the voice input during active search mode
    }
  }, [transcript, listening, searchMode]);

  // Conditional styles for the search bar when voice search is active
  const searchBarStyles = searchMode
    ? 'border border-green-500' // Green border when voice search is active
    : 'border border-gray-400'; // Default border

  // Show the search bar when `showSearch` is true, and voice recognition is active or regular search is visible
  return showSearch && (visible || listening || searchMode) ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className={`inline-flex items-center justify-center px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ${searchBarStyles}`}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search'
        />

        <img className='w-4' src={assets.search_icon} alt='' />
      </div>

      <img
        onClick={() => setShowSearch(false)}
        className='inline w-3 cursor-pointer'
        src={assets.cross_icon}
        alt=''
      />

      <div className='mt-4'>
        {/* <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start Voice Search</button><br/>
        <button onClick={() => SpeechRecognition.stopListening()}>Stop</button><br/>
        <button onClick={resetTranscript}>Reset</button>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <p>Transcript: {transcript}</p> */}
        <p>Search Mode: {searchMode ? 'Active' : 'Inactive'}</p> {/* Show search mode status */}
      </div>
    </div>
  ) : null;
};

export default SearchBar;


// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import { useLocation } from 'react-router-dom';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const SearchBar = () => {
//   const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
//   const [visible, setVisible] = useState(false);
//   const location = useLocation();
//   const [searchMode, setSearchMode] = useState(false); // Controls when the search should be activated

//   // Voice recognition setup with commands for 'search' and 'stop'
//   const commands = [
//     {
//       command: 'search',
//       callback: () => {
//         setSearchMode(true);
//         resetTranscript();
//         setSearch(transcript); // Activate search mode and set the transcript as the search input
//       },
//     },
//     {
//       command: 'stop search',
//       callback: () => {
//         setSearchMode(false);
//         resetTranscript(); // Deactivate search mode and reset the transcript
//         setSearch(''); // Clear the search input
//       },
//     },
//   ];

//   const { transcript, listening, resetTranscript } = useSpeechRecognition({ commands });

//   useEffect(() => {
//     console.log(location.pathname);

//     if (location.pathname.includes('collection' || '/')) {
//       setVisible(true);
//     } else {
//       setVisible(false);
//     }
//   }, [location]);

//   // Update search input only when 'search' mode is activated
//   useEffect(() => {
//     if (listening && searchMode) {
//       setSearch(transcript);  // Update search value with the voice input during active search mode
//     }
//   }, [transcript, listening, searchMode]);

//   // Show the search bar when `showSearch` is true, and voice recognition is active or regular search is visible
//   return showSearch && (visible || listening) ? (
//     <div className='border-t border-b bg-gray-50 text-center'>
//       <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className='flex-1 outline-none bg-inherit text-sm'
//           type='text'
//           placeholder='Search'
//         />

//         <img className='w-4' src={assets.search_icon} alt='' />
//       </div>

//       <img
//         onClick={() => setShowSearch(false)}
//         className='inline w-3 cursor-pointer'
//         src={assets.cross_icon}
//         alt=''
//       />

//       <div className='mt-4'>
//         <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start Voice Search</button><br/>
//         <button onClick={() => SpeechRecognition.stopListening()}>Stop</button><br/>
//         <button onClick={resetTranscript}>Reset</button>
//         <p>Microphone: {listening ? 'on' : 'off'}</p>
//         <p>Transcript: {transcript}</p>
//         <p>Search Mode: {searchMode ? 'Active' : 'Inactive'}</p> {/* Show search mode status */}
//       </div>
//     </div>
//   ) : null;
// };

// export default SearchBar;


// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import { useLocation } from 'react-router-dom';

// // Import SpeechRecognition
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const SearchBar = () => {
//   const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
//   const [visible, setVisible] = useState(false);
//   const location = useLocation();

//   // Voice recognition setup
//   const { transcript, listening, resetTranscript } = useSpeechRecognition();

//   useEffect(() => {
//     console.log(location.pathname);

//     if (location.pathname.includes('collection' || '/')) {
//       setVisible(true);
//     } else {
//       setVisible(false);
//     }
//   }, [location]);

//   // Update search input when voice recognition is active
//   useEffect(() => {
//     if (listening) {
//       setSearch(transcript);  // Update search value with the voice input
//     }
//   }, [transcript, listening]);

//   // Show the search bar when `showSearch` is true, and voice recognition is active or regular search is visible
//   return showSearch && (visible || listening) ? (
//     <div className='border-t border-b bg-gray-50 text-center'>
//       <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className='flex-1 outline-none bg-inherit text-sm'
//           type='text'
//           placeholder='Search'
//         />

//         <img className='w-4' src={assets.search_icon} alt='' />
//       </div>

//       <img
//         onClick={() => setShowSearch(false)}
//         className='inline w-3 cursor-pointer'
//         src={assets.cross_icon}
//         alt=''
//       />

//       <div className='mt-4'>
//         <button onClick={SpeechRecognition.startListening}>Start Voice Search</button><br/>
//         <button onClick={SpeechRecognition.stopListening}>Stop</button><br/>
//         <button onClick={resetTranscript}>Reset</button>
//         <p>Microphone: {listening ? 'on' : 'off'}</p>
//         <p>Transcript: {transcript}</p>
//       </div>
//     </div>
//   ) : null;
// };

// export default SearchBar;
