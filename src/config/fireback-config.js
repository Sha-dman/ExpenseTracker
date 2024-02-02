// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMYwdo5L7L0gKfdJsCcRcJhqWyjG2PVjs",
  authDomain: "expensetracker-f438c.firebaseapp.com",
  projectId: "expensetracker-f438c",
  storageBucket: "expensetracker-f438c.appspot.com",
  messagingSenderId: "432812314847",
  appId: "1:432812314847:web:6ac2d3b04633227c63d96a",
  measurementId: "G-DTJH2M1T1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
