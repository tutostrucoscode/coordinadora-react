// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXgvk-x8ofp-7DCE9zkifuDwSUC6U52MI",
  authDomain: "helpcoor.firebaseapp.com",
  projectId: "helpcoor",
  storageBucket: "helpcoor.appspot.com",
  messagingSenderId: "644338731935",
  appId: "1:644338731935:web:3e2739182a88bca5cd8baa",
  measurementId: "G-C3Y0VL862C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
