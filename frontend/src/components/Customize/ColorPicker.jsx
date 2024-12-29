
import React from 'react'
import {SketchPicker} from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../../store';


const ColorPicker = () => {

  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker 
      color={snap.color}
      // color={snap.items[snap.current]}
      disableAlpha
     onChange={(color)=> state.color = color.hex}
      
      //  onChange={(color)=> state.items[snap.current] = color}
      />


      {snap.current}
      
    </div>

    // <div>
    //   {snap.current}
    //   <HexColorPicker className='picker'
    //   color={snap.items[snap.current]}
    // onChange={(color)=>(state.items[snap.current]=color)}
    // />
    // </div>
  )
}

export default ColorPicker
