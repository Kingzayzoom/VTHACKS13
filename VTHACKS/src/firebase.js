// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Use environment variables
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API,
  authDomain: "authentication-f01d0.firebaseapp.com",
  projectId: "authentication-f01d0",
  storageBucket: "authentication-f01d0.firebasestorage.app",
  messagingSenderId: "572724607537",
  appId: "1:572724607537:web:b6d230f23e163d77b8b310",
  measurementId: "G-RV7EZS2S1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
