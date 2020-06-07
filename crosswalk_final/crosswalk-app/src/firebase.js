import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDWiBNvI4SpLDMydiaaDFN3eNMBjmJrBQE",
  authDomain: "micro-skuska.firebaseapp.com",
  databaseURL: "https://micro-skuska.firebaseio.com",
  projectId: "micro-skuska",
  storageBucket: "micro-skuska.appspot.com",
  messagingSenderId: "585713820018",
  appId: "1:585713820018:web:4070905e2d6a8bb80ebdeb"
});

export { firebaseConfig as firebase };
