import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Dictaphone from '../context/Dictaphone'

// ---- Customization --------------
// import {motion, AnimatePresence} from 'framer-motion  ';
// import {useSnapshot} from 'valtio';
// import {
//   headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation
// } from '../config/motion'
// import state from '../store'

const Home = () => {

  // const snap = useSnapshot(state);
  return (
    <div>
      {/* <Dictaphone /> */}
      <Hero />
      
        <LatestCollection />
        <BestSeller/>
        <OurPolicy />
        <NewsletterBox />
      
    </div>
  )
}

export default Home
