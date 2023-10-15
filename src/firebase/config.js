// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz8ziroH-qNFDO63v0UNc-CLP-q-1Fa0I",
  authDomain: "chat-96f12.firebaseapp.com",
  databaseURL: "https://chat-96f12-default-rtdb.firebaseio.com",
  projectId: "chat-96f12",
  storageBucket: "chat-96f12.appspot.com",
  messagingSenderId: "103801641949",
  appId: "1:103801641949:web:5bcbbee3e44f00d49b3434"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirmeyi aktif
export const auth = getAuth(app);

// google yetkilendirmesi için kurulum
export const provider = new GoogleAuthProvider();

// veritabının referansını oluşturma
export const db = getFirestore(app);
