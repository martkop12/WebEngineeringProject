var json = require('../../simulation_data/car.json');


var car_data = json.features[0].coordinates;
var ped1_data = json.features[1].coordinates;
var ped2_data = json.features[2].coordinates;

const ped1 = 'CfBxEFa4dCfYT8AbdTphagPBqnr1';
const ped2 = 'bjI3mlGfg7MmBVGk2ppGVKbmhWT2';

var test = 0;

const send = async (uid,data,type) => {
    fetch('/api/world', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        id: uid,
        info: type,
        location: {
            latitude: parseFloat(data[0]),
            longitude: parseFloat(data[1]),
        }}),})
    .then(rsp =>{})
    .catch((err)=>{
        console.log(err);
    })
}

export const simulate = async (uid) => {
    let sendData2 = [48.935532,21.912398]
    if(car_data.length > 0){
        let sendData = car_data.shift();
        console.log(sendData);
        send(uid,sendData,'car');
    }
    if(ped1_data.length > 0){
        let sendData = ped1_data.shift();
        send(ped1,sendData,'pedestrian');
    }
    if(ped2_data.length > 0){
        let sendData = ped2_data.shift();
        send(ped2,sendData,'pedestrian');
    } 
    console.log(test++);
}




