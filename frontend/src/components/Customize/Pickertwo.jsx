// import React from 'react'
// import { useSnapshot } from 'valtio'
// import { HexColorPicker } from 'react-colorful'
// import { proxy } from 'valtio'

// const stateTwo = proxy({
//     current: null,
//     items:{

//         sleeveL: "#e04928",
//         sleeveR: "#49251d",
//         collar: "#ffffff",
//         front: "#ffffff",
//         back: "#ffffff",
//         tag: "#ffffff",

//     }
//   });


// const Pickertwo = () => {
    
  
//     const snap = useSnapshot(stateTwo)
//     return (
//         <div>
//             <HexColorPicker className='flex'
//             color={snap.items[snap.current]}
//             onChange={(color)=>(stateTwo.items[snap.current]=color)}
//             />
//             <h1>{snap.current}</h1>
//         </div>
//     )
  
// }

// export default Pickertwo


