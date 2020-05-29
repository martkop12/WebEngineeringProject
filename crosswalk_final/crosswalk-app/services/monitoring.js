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
  const userCrosswalks = typeof req.crosswalks !== 'undefined' ? req.crosswalks : []; //IDs of crosswalks 

  // find every crosswalk in user location (new / old)
  let getCrosswalks = db.collection('monitor').get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      // if crosswalk is not in user's crosswalk array then append to them
      snapshot.forEach(doc => {
        if (distanceBetweenTwoLocations(doc.data().location, clientInformation.location) < 0.1) {
          if (!userCrosswalks.includes(doc.id)) {
            userCrosswalks.push(doc.id)
          }
        }
      });

      // monitor state for each crosswalk retrieved from user and new ones
      (async function checkEveryCrosswalk() {
        try {
          await Promise.all(userCrosswalks.map((crosswalkID) => {
            return db.collection('monitor').doc(crosswalkID).get()
              .then(crosswalk => {
                const currCrosswalk = crosswalk.data();
                // check if user is in distance of crosswalk

                if (distanceBetweenTwoLocations(currCrosswalk.location, clientInformation.location) < 0.1) {
                  // if client is pedestrian then append him to the pedestrians array
                  if (clientInformation.info == "pedestrian") {
                    let updateDoc = db.collection('monitor').doc(crosswalkID.toString()).update({
                      pedestrians: admin.firestore.FieldValue.arrayUnion(clientInformation.id.toString())
                    })
                  };
                  // send information to notify service if client is the car
                  if (clientInformation.info == "car") {
                    notifyCarRequester.send({
                      type: 'crosswalk_information',
                      crosswalk: currCrosswalk
                    })
                  };

                  // send information about client to information service, where the data will be stored
                  var clientData = clientInformation;
                  clientData['time'] = new Date();
                  clientData['crosswalkID'] = crosswalkID;

                  const dataRequest = {
                    type: 'notify',
                    data: clientData
                  };

                  informationRequester.send(dataRequest);
                  // if pedestrian is not in range then remove him from pedestrians array
                } else {
                  console.log('som tu ')
                  if (clientInformation.info == "pedestrian") {
                    let updateDoc = db.collection('monitor').doc(crosswalkID.toString()).update({
                      pedestrians: admin.firestore.FieldValue.arrayRemove(clientInformation.id.toString())
                    });
                  }

                  // remove crosswalk from user's crosswalks
                  const removeCrosswalkIndex = userCrosswalks.indexOf(crosswalkID.toString());

                  if (removeCrosswalkIndex > -1) {
                    userCrosswalks.splice(removeCrosswalkIndex, 1);
                  }
                }
              });
          }));
          // return crosswalks, which are in client area
          cb(null, userCrosswalks);
        } catch (error) {
          console.log(error);
        }
      })();
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
