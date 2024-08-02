// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCx9D8coAEysW0f-bk-JwTsrpHx3LExCgA",
    authDomain: "cabbookingapp-6636d.firebaseapp.com",
    projectId: "cabbookingapp-6636d",
    storageBucket: "cabbookingapp-6636d.appspot.com",
    messagingSenderId: "359588943435",
    appId: "1:359588943435:web:def359dc757a672301dfce",
    measurementId: "G-1K12S1C6KR"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
