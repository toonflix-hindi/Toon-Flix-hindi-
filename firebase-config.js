// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Aapki Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCl5usAaHJAcojnBw0oe2GOIk6qg8AdMt0",
  authDomain: "toonflix-anime-f83a8.firebaseapp.com",
  projectId: "toonflix-anime-f83a8",
  storageBucket: "toonflix-anime-f83a8.firebasestorage.app",
  messagingSenderId: "219084059261",
  appId: "1:219084059261:web:a2f642ee41ff7deec9f714",
  measurementId: "G-4TZ6G7FBE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc };