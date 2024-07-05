// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBLFhSUrUPJ35DF-wfO0MVwRjg6lcs11Y8",
  authDomain: "penpal-746c9.firebaseapp.com",
  projectId: "penpal-746c9",
  storageBucket: "penpal-746c9.appspot.com",
  messagingSenderId: "74833205641",
  appId: "1:74833205641:web:0b49f86ccad3e972826958",
  measurementId: "G-F6CE8R8TYW"
};

initializeApp(firebaseConfig);

const auth = getAuth();

export default {
  auth,
};
