
import { Canvas} from '@react-three/fiber'
import {Environment, Center} from '@react-three/drei';
import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import Tshirt from './Tshirt';
import TshirtV2 from './TshirtV2';

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{position: [0,0,0], fov:50}}
      gl = {{ preserveDrawingBuffer: true}}
        className = "w-full max-w-full h-full transition-all ease-in"
      
            >

      <ambientLight intensity={0.5}/>
      <Environment preset="city"/>

     <CameraRig>
      {/* <Backdrop/> */}
      <Center> 
        <Shirt /> 
        {/* <Tshirt /> */}
        {/* <TshirtV2/> */}
        
      </Center>

     </CameraRig>
      

      

      </Canvas>
  )
}

export default CanvasModel 