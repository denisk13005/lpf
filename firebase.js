
// Your web app's Firebase configuration

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {

  apiKey: "AIzaSyCd38UMTKwRhd-ACTSirdz0dNqc_LFgKv8",

  authDomain: "la-petite-friperie-baeb4.firebaseapp.com",

  projectId: "la-petite-friperie-baeb4",

  storageBucket: "la-petite-friperie-baeb4.appspot.com",

  messagingSenderId: "161843937685",

  appId: "1:161843937685:web:01623a73f6895deac7369c"

};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app as firebase };
