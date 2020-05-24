const cote = require('cote');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});


const clientInformationReceiver = new cote.Responder({
  name: "receiving and storing information about client and pedestrians - responder",
  key: 'store_information'
});

const db = admin.firestore();

clientInformationReceiver.on('notify', (req, cb) => {
  const data = req.data;

  const client = data.info.toString();
  const crosswalkID = data.crosswalkID.toString();
  const clientID = data.id.toString();
  const information = {
    time: data.time,
    location: data.location
  }

// add information to DB
  let addInformationRef = db.collection('information').doc(crosswalkID).collection(client).doc(clientID).collection('route');
  let addInformationDoc = addInformationRef.add(information);
})