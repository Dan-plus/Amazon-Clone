// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkd2zDA6RChXlmN1KnFvgE6bQKw7lzJAE",
  authDomain: "clone-8628b.firebaseapp.com",
  projectId: "clone-8628b",
  storageBucket: "clone-8628b.firebasestorage.app",
  messagingSenderId: "603033519516",
  appId: "1:603033519516:web:51f75abdbfcbfeffc67459",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export db = app.firebase();

