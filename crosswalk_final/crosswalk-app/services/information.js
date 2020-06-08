const cote = require('cote');
const admin = require('firebase-admin');
const serviceAccount = require('../firebaseAccountKey.json');

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

  // add information to DB
  const addInfoRef = db.collection('information').doc(crosswalkID);
  addInfoRef.get()
    .then((docSnapshot) => {
      // if doc exists then append pede/car
      if (docSnapshot.exists) {
        if (client == 'pedestrian') {
          addInfoRef.update({
            pedestrians: admin.firestore.FieldValue.arrayUnion({
              id: clientID,
              location: data.location,
              time: data.time
            })
          });
        } else {
          addInfoRef.update({
            cars: admin.firestore.FieldValue.arrayUnion({
              id: clientID,
              location: data.location,
              time: data.time
            })
          });
        }
        // else create new doc for crosswalk
      } else {
        if (client == 'pedestrian') {
          addInfoRef.set({
            cars: [],
            pedestrians: [{
              id: clientID,
              location: data.location,
              time: data.time
            }]
          });
        } else {
          addInfoRef.set({
            cars: [{
              id: clientID,
              location: data.location,
              time: data.time
            }],
            pedestrians: []
          });
        }
      }
    });
})