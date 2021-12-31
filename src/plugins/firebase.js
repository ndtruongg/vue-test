import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiknAUX9224oTxCODiYjc8pVzuVD1ee-w",
  authDomain: "chat-156a9.firebaseapp.com",
  projectId: "chat-156a9",
  storageBucket: "chat-156a9.appspot.com",
  messagingSenderId: "40500826357",
  appId: "1:40500826357:web:48624d5b36bf3eff4175bc",
  measurementId: "G-QQJ5GZ6B0E",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
