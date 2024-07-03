import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL9qif4fVy_kySAJm5Qb_N0zltuiWHvsE",
  authDomain: "travel-planner-ac125.firebaseapp.com",
  projectId: "travel-planner-ac125",
  storageBucket: "travel-planner-ac125.appspot.com",
  messagingSenderId: "527597259366",
  appId: "1:527597259366:web:10912949de1c6c3280bba7",
  measurementId: "G-ZZ0G5SJNKM"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
const analytics = getAnalytics(app);
export const auth = getAuth();