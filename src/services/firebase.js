// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCt85fVlUhP8DQdFf4Mua4OUSPTP0Q4ilI",
  authDomain: "awayout-55fe2.firebaseapp.com",
  projectId: "awayout-55fe2",
  storageBucket: "awayout-55fe2.appspot.com",
  messagingSenderId: "149411277678",
  appId: "1:149411277678:web:3b54182d8907f8f35daf7f",
  measurementId: "G-E3P0XKCC6W",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
