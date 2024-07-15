
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-990c8.firebaseapp.com",
  projectId: "chatapp-990c8",
  storageBucket: "chatapp-990c8.appspot.com",
  messagingSenderId: "747732240286",
  appId: "1:747732240286:web:a2b18f1e799bc6b561b88f"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db=getFirestore()
export const storage=getStorage()
