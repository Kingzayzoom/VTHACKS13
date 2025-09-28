// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBfVCTfw1zS1z2Tdiy_7e5CrRrC1p9itd0",
  authDomain: "authentication-f01d0.firebaseapp.com",
  projectId: "authentication-f01d0",
  storageBucket: "authentication-f01d0.firebasestorage.app",
  messagingSenderId: "572724607537",
  appId: "1:572724607537:web:b6d230f23e163d77b8b310",
  measurementId: "G-RV7EZS2S1H"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Export auth instance (for login/signup)
export const auth = getAuth(app);
