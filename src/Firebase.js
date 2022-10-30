// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrAXt8IXZff1EdM4nv95nJFFHFtw62YoM",
  authDomain: "chatprivate-ae977.firebaseapp.com",
  projectId: "chatprivate-ae977",
  storageBucket: "chatprivate-ae977.appspot.com",
  messagingSenderId: "376080641816",
  appId: "1:376080641816:web:6a9b4314dfb04dfe1df86d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
