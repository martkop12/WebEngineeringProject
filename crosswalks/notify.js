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
    information: req
  }
  carNotifierRequester.send(notification);
});




