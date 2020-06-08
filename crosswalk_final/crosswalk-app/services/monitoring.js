const cote = require('cote');
const admin = require('firebase-admin');
const serviceAccount = require('../firebaseAccountKey.json');

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

  // fetch every crosswalk
  let getCrosswalks = db.collection('monitor').get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      // for each crosswalk
      snapshot.forEach(crosswalk => {
        const crosswalkData = crosswalk.data();

        // if client is pedestrian
        if (clientInformation.info === 'pedestrian') {
          // if pedestrian is already in crosswalk pedestrians array
          if (crosswalkData.pedestrians.includes(clientInformation.id.toString())) {
            // if client leave the crosswalk area then remove it from crosswalk pedestrians array
            if (!distanceBetweenTwoLocations(crosswalkData.location, clientInformation.location) < 0.1) {
              let updateDoc = db.collection('monitor').doc(crosswalk.id.toString()).update({
                pedestrians: admin.firestore.FieldValue.arrayRemove(clientInformation.id.toString())
              })
            }
          } else {
            // if pedestrian is not in crosswalk pedetrians array and he is in crosswalk array than push him to the pedestrians array
            if (distanceBetweenTwoLocations(crosswalkData.location, clientInformation.location) < 0.1) {
              let updateDoc = db.collection('monitor').doc(crosswalk.id.toString()).update({
                pedestrians: admin.firestore.FieldValue.arrayUnion(clientInformation.id.toString())
              })
            }
          }
        }

        // if client is car then send clientiformation to notification service
        if (clientInformation.info === 'car') {
          if (distanceBetweenTwoLocations(crosswalkData.location, clientInformation.location) < 0.1) {
            notifyCarRequester.send({
              type: 'crosswalk_information',
              crosswalk: crosswalkData
            })
          }
        }

        // send information to information service to store location if client is in the crosswlak distance
        if (distanceBetweenTwoLocations(crosswalkData.location, clientInformation.location) < 0.1) {
          var clientData = clientInformation;
          clientData['time'] = new Date();
          clientData['crosswalkID'] = crosswalk.id;

          // send information to information service
          const dataRequest = {
            type: 'notify',
            data: clientData
          };
          informationRequester.send(dataRequest);
        }
      });
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
