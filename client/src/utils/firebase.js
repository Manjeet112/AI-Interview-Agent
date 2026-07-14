

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getAuth,GoogleAuthProvider }from "firebase/auth"
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-639dd.firebaseapp.com",
  projectId: "interviewiq-639dd",
  storageBucket: "interviewiq-639dd.firebasestorage.app",
  messagingSenderId: "256488912919",
  appId: "1:256488912919:web:4781e662ff3418c21e4452"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {auth,provider}