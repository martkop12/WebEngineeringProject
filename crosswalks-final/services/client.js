const express = require('express');
const cote = require('cote');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const notifyResponder = new cote.Responder({ 
  name: "notify user about distance to crosswalk - responder",
  key:"notify"
});

const clientLocationSender = new cote.Requester({ 
  name: "sending pede/car location to monitor service - requester",
  key: 'sending_location'
});

app.get('/', (req, res) => res.send('Hello World!'));

// send client to monitoring service
app.post('/user', (req, res) => {
  const request = {
    type: 'send_client_info',
    user: req.body,
    crosswalks: req.body.near_crosswalks
  }
  clientLocationSender.send(request, (err, res) => {
    console.log("callback:",res);
  });

  res.send(req.body);
})

// notify car if pedestrian is in crosswalk area and provide state of light
notifyResponder.on('notifUser', (req, cb) => {
  const trafficLight = req.state_of_light;
  const pedestrianInArea = req.pedestrian_in_area;
  const crosswalkLocation = req.location

  console.log('Pedestrian in area: ', pedestrianInArea);
  console.log('Traffic light: ', trafficLight);
  console.log('Location: ', crosswalkLocation);
  console.log('\n');
})

const port = 3001;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));