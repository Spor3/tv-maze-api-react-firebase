// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNpljigVGkgXL71Vt3J4P3OQiDQTVRf6s",
  authDomain: "react-tv-maze-api.firebaseapp.com",
  databaseURL: "https://react-tv-maze-api-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-tv-maze-api",
  storageBucket: "react-tv-maze-api.appspot.com",
  messagingSenderId: "465431431722",
  appId: "1:465431431722:web:91e808247d8c3a937dd153"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);