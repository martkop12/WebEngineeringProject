
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


let getDoc = db.collection('information').doc('1').collection('pedestrian').doc('2').collection('route').add({
    time: '14.525.5',
    location: {
        latitude: 245.58,
        longitude: 25.89
    }
})
