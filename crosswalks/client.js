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
    user: req.body
  }

  clientLocationSender.send(request);

  res.send(req.body);
})

// notify car if pedestrian is in crosswalk area and provide state of light
notifyResponder.on('notifUser', (req, cb) => {
  const trafficLight = req.information.crosswalk.state_of_light;
  const pedestrianInArea = req.information.crosswalk.pedestrian_in_area;

  console.log(trafficLight, pedestrianInArea);
})

const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));