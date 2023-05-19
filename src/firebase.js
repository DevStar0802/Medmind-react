// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhQadyL8S1-6s7GDiRtEhCGKqrP-_DQ4w",
  authDomain: "medmind-6f2a3.firebaseapp.com",
  projectId: "medmind-6f2a3",
  storageBucket: "medmind-6f2a3.appspot.com",
  messagingSenderId: "451604756761",
  appId: "1:451604756761:web:005bfb493664584de12d88",
  measurementId: "G-WSS1T3NL4L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
