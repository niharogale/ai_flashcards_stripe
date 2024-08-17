// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7UX4wIQrJBHj31FAby3wZxssfuZZg6RE",
  authDomain: "flashcardsaas-2f482.firebaseapp.com",
  projectId: "flashcardsaas-2f482",
  storageBucket: "flashcardsaas-2f482.appspot.com",
  messagingSenderId: "719614144096",
  appId: "1:719614144096:web:08ef096031318742779d05",
  measurementId: "G-5LJHP8KM2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// Initialize Analytics only on the client side
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export {db, analytics}