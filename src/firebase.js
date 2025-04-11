// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // if you need Firestore
import { getStorage } from "firebase/storage"; // if you need Storage

const firebaseConfig = {
  apiKey: "AIzaSyDBwURtekNHtCTq-2QF2cYhC1kNp-99RKU",
  authDomain: "cargo-plus-408ad.firebaseapp.com",
  projectId: "cargo-plus-408ad",
  storageBucket: "cargo-plus-408ad.appspot.com", // corrected
  messagingSenderId: "485452401410",
  appId: "1:485452401410:web:f35a252758aae180ac101b",
  measurementId: "G-6HM37M9SV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, analytics };
