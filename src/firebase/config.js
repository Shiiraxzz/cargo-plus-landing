// src/firebase/config.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDBwURtekNHtCTq-2QF2cYhC1kNp-99RKU",
    authDomain: "cargo-plus-408ad.firebaseapp.com",
    projectId: "cargo-plus-408ad",
    storageBucket: "cargo-plus-408ad.appspot.com", // corrected
    messagingSenderId: "485452401410",
    appId: "1:485452401410:web:f35a252758aae180ac101b",
    measurementId: "G-6HM37M9SV9"
  };

// ✅ Fix: only initialize if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
