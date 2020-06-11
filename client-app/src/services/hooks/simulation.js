var json = require('../../simulation_data/car.json');


const send = async (uid,data,type,sender) => {
    console.log(uid);
    if(data == null){
        console.log('finished');
        clearInterval(sender);
    }
    fetch('/api/world', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        id: uid,
        info: type,
        location: {
            latitude: 48.25,
            longitude: 25.22,
        }}),})
    .then(rsp =>{
        console.log('r:',rsp);
    })
    .catch((err)=>{
        console.log(err);
    })

}

export const simulate = async (uid) => {

    const ped1 = 'CfBxEFa4dCfYT8AbdTphagPBqnr1';
    const ped2 = 'bjI3mlGfg7MmBVGk2ppGVKbmhWT2';
    
    const car_data = json.features[0].coordinates;
    const ped1_data = json.features[1].coordinates;
    const ped2_data = json.features[2].coordinates;

    let sender1, sender2, sender3;

    
    sender1 = setInterval(send, 1000,uid,car_data.shift(),'car',sender1);
    
    sender2 = setInterval(send, 1000, ped1, ped1_data.shift(), 'pedestrian', sender2);
    
    sender3 = setInterval(send, 1000, ped2, ped2_data.shift(), 'pedestrian', sender3);  
    
}



