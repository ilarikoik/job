// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Muokattu tuonti

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChy_5JbUVeLpCjG2A0eqVOGYnuZEz8Kgs",
  authDomain: "jobhunt-acc8e.firebaseapp.com",
  projectId: "jobhunt-acc8e",
  storageBucket: "jobhunt-acc8e.firebasestorage.app",
  messagingSenderId: "504987855794",
  appId: "1:504987855794:web:efebb0078db8b6ec6612ab",
  measurementId: "G-EMM2LLB86S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup }; // Muokattu export
