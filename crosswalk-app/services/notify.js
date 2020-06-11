const cote = require('cote');

const monitorNotifyResponder = new cote.Responder({
  name: 'receiving information about notification - responder',
  key: 'notify_car'
});
const carNotifierRequester = new cote.Requester({
  name: 'notify car - requester',
  key: 'notify'
});

// receive information about notification
monitorNotifyResponder.on('crosswalk_information', (req, cb) => {
  // notify car about current state of crosswalk
  const notification = {
    type: 'notifUser',
    pedestrian_in_area: req.crosswalk.pedestrians.length > 0 ? true : false,
    state_of_light: req.crosswalk.state_of_light,
    location: req.crosswalk.location
  }

  carNotifierRequester.send(notification);
});




