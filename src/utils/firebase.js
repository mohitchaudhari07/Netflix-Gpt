// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABDFeDoAnS4YfNNBjJoPyotQ9fBdgJiDE",
  authDomain: "netflixgpt-72737.firebaseapp.com",
  projectId: "netflixgpt-72737",
  storageBucket: "netflixgpt-72737.firebasestorage.app",
  messagingSenderId: "837575646861",
  appId: "1:837575646861:web:a97a9c32ead4fc8f028cc4",
  measurementId: "G-FYRP04L9F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 getAnalytics(app);

export const auth = getAuth();