// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnSUpbDJ4dBmrZiTAuz3udonjMXXc_Py0",
  authDomain: "gadg-store.firebaseapp.com",
  projectId: "gadg-store",
  storageBucket: "gadg-store.appspot.com",
  messagingSenderId: "107255692117",
  appId: "1:107255692117:web:001de7f2d2333c99f34ddc",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
