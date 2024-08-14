// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkfHHgnj0Ghom6WE4LWOiZw37L_E_gqVw",
  authDomain: "ai-flashcards-cea18.firebaseapp.com",
  projectId: "ai-flashcards-cea18",
  storageBucket: "ai-flashcards-cea18.appspot.com",
  messagingSenderId: "519121489636",
  appId: "1:519121489636:web:49b4413904df43227166f1",
  measurementId: "G-MYSJYDJ0G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);