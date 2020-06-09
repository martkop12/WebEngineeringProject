import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { stat } from "fs";

export const useCrosswalk = crosswalkId => {
    const [crosswalkData, setCrosswalkData] = useState();
  
    useEffect(() => {
    firebase.firestore().collection(`information`).doc(`${crosswalkId}`).get().then((snapshot) => {
        setCrosswalkData({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
    }, [crosswalkId]);
  
    return { crosswalkData, setCrosswalkData };
  };

  
export const useCrosswalkLight = crosswalkId => {
  const [crosswalkLight, setCrosswalkLight] = useState();

  useEffect(() => {
  firebase.firestore().collection(`monitor`).doc(`${crosswalkId}`).get().then((snapshot) => {
    let stateOfLight = snapshot.data().state_of_light;
    setCrosswalkLight({
          id: snapshot.id,
              stateOfLight
        });
      });
  }, [crosswalkId]);

  return { crosswalkLight, setCrosswalkLight };
};
