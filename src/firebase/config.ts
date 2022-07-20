import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcz5piHCGPVWIqdMqmVKg3PRBNCr8i9LQ",
  authDomain: "mymoney-29ef6.firebaseapp.com",
  projectId: "mymoney-29ef6",
  storageBucket: "mymoney-29ef6.appspot.com",
  messagingSenderId: "919570927642",
  appId: "1:919570927642:web:03d2a5bd57dba2c01841a3",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const timestamp = firebase.firestore.Timestamp;
