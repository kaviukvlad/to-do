import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1yM4ystRIx7zpTbUKrKSSIf_F-BiZ8SU",
  authDomain: "to-do-b74cb.firebaseapp.com",
  projectId: "to-do-b74cb",
  storageBucket: "to-do-b74cb.firebasestorage.app",
  messagingSenderId: "369368576444",
  appId: "1:369368576444:web:f15864a517379214e13bb9"
};

export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const db = getFirestore(FirebaseApp);

