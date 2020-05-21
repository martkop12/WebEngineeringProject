// Authentication service for SPWS. 
// Here will contain the login functions using firebase auth-service.
// This file should be inserted as your first script.
// Note: you also need the firebase SKD in your HTML file and it needed to be first than this file.
// The SDKs needed are:
/* 
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-firestore.js"></script>
<!-- TODO: Add SDKs for Firebase products that you want to use
    https://firebase.google.com/docs/web/setup#available-libraries -->
*/


var firebaseConfig = {
    apiKey: "AIzaSyAbB_Z-BdN0Rn8SYZCVgBKf6z6-zZlcsT8",
    authDomain: "spws-authentication.firebaseapp.com",
    databaseURL: "https://spws-authentication.firebaseio.com",
    projectId: "spws-authentication",
    appId: "1:144417189463:web:e5d6272161b11d4fa2bd12"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Function to check if the user is logged in the system of not.



// Function to add a new User in the frebase database.
async function createNewUser(name, email, password){
    auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
        console.log('User created on: ',cred.user.email);
        // add here the user data that you want to keep in the database
        // the cred.user.id link the same id for the user in the auth database and in the users database
        db.collection('users').doc(cred.user.uid).set({
        name: name})
        .then(response => {return response;})
        .catch(err => {return err;})
    })
    .catch(err => {return err;})
}
// Function to logout the user in the firebase database.
async function logoutUser(){
    auth.signOut().then((status)=>{
    })
}
// Function to login a new user in the firebase database.
async function loginUser(email,password){
    auth.signInWithEmailAndPassword(email,password)
        .then(cred => {
            console.log(cred.user);
        })
        .catch(err => {
            console.log(err.code);
        })
}

