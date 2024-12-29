
import React, {useRef, useState, Suspense} from 'react';
import { easing } from 'maath';
import { useSnapshot, proxy, snapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';
import { HexColorPicker } from 'react-colorful';
import { color } from 'framer-motion';


const TshirtV2 = () => {
  const snap = useSnapshot(state);
  const group = useRef()
  const { nodes, materials } = useGLTF('/scene.glb');
  const [hovered, set] = useState(null)
  
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Ensure the textures are loaded before rendering Decals
//   if (!logoTexture || !fullTexture) {
//     return null; // Or a loading spinner, placeholder mesh, etc.
//   }

//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
useFrame((state, delta) => easing.dampC(
    // materials['Cotton_Heavy_Twill_116740'].color.set(snap.items.back);
    // materials['Cotton_Heavy_Twill_116740.010'].color.set(snap.items.front);
    // materials['Cotton_Heavy_Twill_Copy_1_116819'].color.set(snap.items.sleeveL);
    // materials.Cotton_Heavy_Twill_Copy_1_116819.color.set(snap.items.sleeveL);
    
    materials.Collar, snap.items.collar, 0.5, delta)
    // materials['Rib_1X1_486gsm_116764'].color.set(snap.items.collar);
  );
  

  // const stateString = JSON.stringify(snap);
  
  
  
  return (
    
     <group  ref={group}
     dispose={null}   position={[-0.02, 0, 0]}
    onPointerOver={(e)=>{e.stopPropagation(), set(e.object.material.name)}}
    onPointerOut={(e)=> (e.intersections.length===0 && set(null))}
    onPointerDown={(e)=>{e.stopPropagation(); state.current = e.object.material.name}}
    onPointerMissed={(e)=>{state.current = null}}
   >
         <mesh geometry={nodes.Object_7.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_10.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_13.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_16.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_19.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_22.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_25.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_28.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_31.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_34.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_37.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_40.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_43.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_46.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_49.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_52.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_55.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_58.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_61.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_64.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_67.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_70.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_73.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_76.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_79.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_82.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_85.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_88.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_91.geometry} material={materials['Default_Topstitch_2747.001']} />
        <mesh geometry={nodes.Object_94.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_97.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_100.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_103.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_106.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_109.geometry} material={materials['Default_Topstitch_2803.002']} />
        <mesh geometry={nodes.Object_111.geometry} material={materials.Front} />
        <mesh geometry={nodes.Object_113.geometry} material={materials.Back} />
        <mesh material-color = {snap.items.front} geometry={nodes.Object_115.geometry} material={materials.Front} />
        <mesh  geometry={nodes.Object_117.geometry} material={materials.Front} />
        <mesh geometry={nodes.Object_119.geometry} material={materials.Tag} />
        <mesh material-color = {snap.items.collar} geometry={nodes.Object_121.geometry} material={materials.Collar} />
        <mesh geometry={nodes.SleevesLeft.geometry} material={materials.SleevesRight} />
        <mesh material-color = {snap.items.sleeveR} geometry={nodes.Object_125.geometry} material={materials.SleevesRight} />
      </group>
     
       
      
    
  );
};

export default TshirtV2;
