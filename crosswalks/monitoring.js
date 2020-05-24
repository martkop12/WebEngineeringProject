const cote = require('cote');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const clientInformationReceiver = new cote.Responder({
  name: "receiving information about client - responder",
  key: 'sending_location'
});

const informationRequester = new cote.Requester({
  name: "send infromation if pede/car are in the area of crosswalk - requester",
  key: 'store_information'
});

const notifyCarRequester = new cote.Requester({
  name: "request to notify car with crosswalk information - requester",
  key: "notify_car"
});

// receive information from client location and pede/car
clientInformationReceiver.on('send_client_info', (req, cb) => {
  const clientInformation = req.user;

  let getDoc = db.collection('monitor').get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach(doc => {
        if (distanceBetweenTwoLocations(doc.data().location, clientInformation.location) < 0.1) {
          // if pedestrian is in the area of the crossroad then change var: pedestrian_in_area to TRUE
          if (clientInformation.info == "pedestrian") {
            let updateDoc = db.collection('monitor').doc(doc.id).update({
              pedestrian_in_area: true
            })
          }

          // send information to notify service if client is the car
          if (clientInformation.info == "car") {
            notifyCarRequester.send({
              type: 'crosswalk_information',
              crosswalk: doc.data()
            })
          }

          var clientData = clientInformation;
          clientData['time'] = new Date();
          clientData['crosswalkID'] = doc.id;

          const dataRequest = {
            type: 'notify',
            data: clientData
          }

          // send information about client to information service, where the data will be stored
          informationRequester.send(dataRequest);
        } else {
          // pedestrian leaves the area of crossroad
          if (doc.data().pedestrian_in_area == false) {
            let updateDoc = db.collection('monitor').doc(doc.id).update({
              pedestrian_in_area: false
            })
          }
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
});


function distanceBetweenTwoLocations(current_location, end_location) {
  // returns distance in KM

  var lat1 = current_location.latitude;
  var lon1 = current_location.longitude;
  var lat2 = end_location.latitude;
  var lon2 = end_location.longitude;

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c; // Distance in km

  return distance * 1000;
}

// helper function
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}
