import { initializeApp } from "firebase/app";
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

export { db, collection, getDocs, addDoc, updateDoc, doc };
