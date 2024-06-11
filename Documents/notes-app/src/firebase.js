import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDvA1b6CEnGfAWn5qVqkufMWEivQpdRYsY",
  authDomain: "notes-app-95ef7.firebaseapp.com",
  projectId: "notes-app-95ef7",
  storageBucket: "notes-app-95ef7.appspot.com",
  messagingSenderId: "713941076850",
  appId: "1:713941076850:web:34c5661ff725245556abeb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, getDocs, addDoc, updateDoc, doc, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };
