// const express = require("express");
// const cote = require('cote');

// const http = require("http");
// const socketIo = require("socket.io");
// const bodyParser = require('body-parser');

// const port = 5000;
// const index = require("../routes/index");

// const app = express();
// app.use(index);
// app.use(bodyParser.json());

// const server = http.createServer(app);

// const io = socketIo(server);

// let interval;

// const notifyResponder = new cote.Responder({
//   name: "notify user about distance to crosswalk - responder",
//   key: "notify"
// });

// const clientLocationSender = new cote.Requester({
//   name: "sending pede/car location to monitor service - requester",
//   key: 'sending_location'
// });

// app.get('/', (req, res) => res.send('Hello World!'));

// // initialize socket connection
// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }

//   // send client info to monitoring service
//   app.post('/api/world', (req, res) => {
//     console.log("post click")
//     // console.log(req)
//     const request = {
//       type: 'send_client_info',
//       user: req.body,
//       crosswalks: req.body.nearCrosswalks
//     }
//     // send back near crosswalks
//     clientLocationSender.send(request, (err, res) => {
//       socket.emit("nearCrosswalks", res);
//       // console.log("callback:", res);
//     });

//     res.send(req.body);
//   });

//   // notify car if pedestrian is in crosswalk area and provide state of light
//   notifyResponder.on('notifUser', (req, cb) => {
//     const trafficLight = req.state_of_light;
//     const pedestrianInArea = req.pedestrian_in_area;
//     const crosswalkLocation = req.location;

//     socket.emit("notifyInformation", {
//       pedestrianInArea: pedestrianInArea,
//       trafficLight: trafficLight,
//       crosswalkLocation: crosswalkLocation
//     });
//   });


//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// server.listen(port, () => console.log(`Listening on port ${port}`));

const express = require("express");
const cote = require('cote');

const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');

const port = 5000;
const index = require("../routes/index");

const app = express();
app.use(index);
app.use(bodyParser.json());

const server = http.createServer(app);

const io = socketIo(server);

let interval;

const notifyResponder = new cote.Responder({
  name: "notify user about distance to crosswalk - responder",
  key: "notify"
});

const clientLocationSender = new cote.Requester({
  name: "sending pede/car location to monitor service - requester",
  key: 'sending_location'
});

app.get('/', (req, res) => res.send('Hello World!'));

// initialize socket connection
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  // http request for sending information to monitoring service
  app.post('/api/world', (req, res) => {
    console.log("post click")
    // console.log(req)
    const request = {
      type: 'send_client_info',
      user: req.body,
    }

    // send information to monitoring service
    clientLocationSender.send(request, (res) => {
      console.log(res);
    });

    res.send(req.body);
  });

  // notify car if pedestrian is in crosswalk area and provide state of light
  notifyResponder.on('notifUser', (req, cb) => {
    const trafficLight = req.state_of_light;
    const pedestrianInArea = req.pedestrian_in_area;
    const crosswalkLocation = req.location;

    socket.emit("notifyInformation", {
      pedestrianInArea: pedestrianInArea,
      trafficLight: trafficLight,
      crosswalkLocation: crosswalkLocation
    });
  });


  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));