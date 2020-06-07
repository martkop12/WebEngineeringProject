import React, { useState, useEffect, useContext } from 'react';
import socketIOClient from "socket.io-client";
import '../App.css';
import { AuthContext } from "../Auth";

const ENDPOINT = "http://127.0.0.1:5000";

function User() {
  const [clientID, setClientID] = useState('');
  const [clientInfo, setClientInfo] = useState('pedestrian');
  const [clientLatitude, setClientLatitude] = useState('');
  const [clientLongitude, setClientLongitude] = useState('');
  const [crosswalks, setCrosswalks ] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("notifyInformation", data => {
      console.log(data);
      setCrosswalks(data);
    });
    
  },[]);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: clientID,
        info: clientInfo,
        location: {
          latitude: parseFloat(clientLatitude),
          longitude: parseFloat(clientLongitude)
        }
      }),
    });  
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Client information:</strong>
        </p>
        <label>
            id: {currentUser.uid}
        </label>

        <br></br>
        <label>
          info:
          <select value={clientInfo} onChange={e => setClientInfo(e.target.value)}>
            <option value="pedestrian">pedestrian</option>
            <option value="car">car</option>
          </select>
        </label>
        <br></br>
        <label>
          latitude:
        <input
            type="latitude"
            value={clientLatitude}
            onChange={e => setClientLatitude(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          longitude:
        <input
            type="longitude"
            value={clientLongitude}
            onChange={e => setClientLongitude(e.target.value)}
          />
        </label>
        <br></br>

        <button type="submit">Submit</button>

      </form>
      <br></br>
      <br></br>
      {crosswalks.length > 0 &&
        crosswalks.map((crosswalk) => (
          <p> ze daco </p>
        ))
      }
    </div>
  );
}

export default User;

