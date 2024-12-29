import { proxy } from "valtio";
// import logo from '../assets/ahlogo.png' 

const state = proxy({
    intro: false,
    color: '#EFBD48',
    // color: '#CC00CC',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal:'./threejs.png',
    fullDecal: './threejs.png',   

});


export default state ;