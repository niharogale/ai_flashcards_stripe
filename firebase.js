// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLKwlSZO9N5g9baZtX1HZeHARCxD4E5rI",
  authDomain: "smart-cards-c3b2c.firebaseapp.com",
  projectId: "smart-cards-c3b2c",
  storageBucket: "smart-cards-c3b2c.appspot.com",
  messagingSenderId: "1025551480218",
  appId: "1:1025551480218:web:1acd7255775f5ad600f623",
  measurementId: "G-TX87TWNP0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}
