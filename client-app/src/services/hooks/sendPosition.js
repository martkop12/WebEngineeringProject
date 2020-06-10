import React, {useState,useEffect} from 'react';
import {firebase} from '../firebase';


export const sendPosition (type) =>{

    const [state,setState] = useState(false);

    const _getLocationAsync = async () => {
        let location = await navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position);},
            (error) =>{
              console.log('Error:', error);
            }
        ) 
    }

    useEffect(
        () => {
            if(running){setInterval(_getLocationAsync,2000);}
            else{clearInterval();}
            return () =>{
                if(running){clearInterval();}
            }
    }, [running],)
}

