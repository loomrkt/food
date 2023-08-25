// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwFc9bw0A1AhadN4brilfe-YB4lIDJbdw",
  authDomain: "yummybreak-df5cd.firebaseapp.com",
  projectId: "yummybreak-df5cd",
  storageBucket: "yummybreak-df5cd.appspot.com",
  messagingSenderId: "572413652944",
  appId: "1:572413652944:web:39c2504d0cde2526ea13d5",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {
  firestore,
  storage,
  collection,
  addDoc,
  updateDoc,
  ref,
  uploadBytes,
  getDownloadURL,
};
