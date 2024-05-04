import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApg51K-pyhvxWPLKNHJPydA_-r1A9WErc",
  authDomain: "reactchat-5013c.firebaseapp.com",
  projectId: "reactchat-5013c",
  storageBucket: "reactchat-5013c.appspot.com",
  messagingSenderId: "711142894924",
  appId: "1:711142894924:web:674831374db572b49473e9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
