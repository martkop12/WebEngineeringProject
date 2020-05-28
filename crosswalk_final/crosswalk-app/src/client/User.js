import React, {useState, useEffect} from 'react';
import '../App.css';

function User() {
  const [clientID, setClientID] = useState('');
  const [clientInfo, setClientInfo] = useState('');
  const [clientLatitude, setClientLatitude] = useState('');
  const [clientLongitude, setClientLongitude] = useState('');

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
        id:
        <input
          type="id"
          value={clientID}
          onChange={e => setClientID(e.target.value)}
        />
      </label>
      
      <br></br>
      <label>
        info:
        <input
          type="info"
          value={clientInfo}
          onChange={e => setClientInfo(e.target.value)}
        />
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
          type="id"
          value={clientLongitude}
          onChange={e => setClientLongitude(e.target.value)}
        />
      </label>
      <br></br>

      <button type="submit">Submit</button>
    </form>
  </div>
  );
}

export default User;
