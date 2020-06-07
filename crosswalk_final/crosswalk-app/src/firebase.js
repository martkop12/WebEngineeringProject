import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAa589G-K1Y2PmIthUWRGkugmrtJo2tDH8",
  authDomain: "timovy-projekt-2019.firebaseapp.com",
  databaseURL: "https://timovy-projekt-2019.firebaseio.com",
  projectId: "timovy-projekt-2019",
  storageBucket: "timovy-projekt-2019.appspot.com",
  messagingSenderId: "675342843605",
  appId: "1:675342843605:web:43b5c4f568f7896b522c5c"
});

export { firebaseConfig as firebase };
