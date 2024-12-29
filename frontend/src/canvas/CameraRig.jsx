import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if(snap.intro) {
      if(isBreakpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })


  return <group ref={group}>{children}</group>
}

export default CameraRig

// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { easing } from 'maath';
// import state from '../store';
// import { useSnapshot } from 'valtio';

// const CameraRig = ({ children }) => {
//   const group = useRef();
//   const snap = useSnapshot(state);

//   useFrame((state, delta) => {
//     const isBreakpoint = window.innerWidth <= 1260;
//     const isMobile = window.innerWidth <= 600;

//     // Setting the initial position of the model
//     let targetPosition = [-0.4, 0, 2];
//     if (snap.intro) {
//       if (isBreakpoint) targetPosition = [0, 0, 2];
//       if (isMobile) targetPosition = [0, 0, 2.5];
//     } else {
//       if (isMobile) targetPosition = [0, 0, 2.5];
//       else targetPosition = [0, 0, 2];
//     }

//     // Smoothly adjust the camera position
//     easing.damp3(state.camera.position, targetPosition, 0.25, delta);

//     // Set up 360-degree rotation for the model
//     const rotationSpeed = 0.5; // Adjust this value to control speed of rotation
//     group.current.rotation.y += rotationSpeed * delta; // Continuous rotation on the Y-axis

//     // Optionally add pointer-based rotation to simulate user interaction
//     // Uncomment the lines below to rotate based on pointer movement
//     easing.dampE(
//        group.current.rotation,
//        [state.pointer.y / 10, -state.pointer.x / 5, 0],
//        0.25,
//        delta
//      );
//   });

//   return <group ref={group}>{children}</group>;
// };

// export default CameraRig;