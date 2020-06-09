import { useState, useEffect } from "react";
import { firebase } from "../firebase";

export const useCrosswalk = crosswalkId => {
    const [crosswalkData, setCrosswalkData] = useState();
  
    useEffect(() => {
    //   const userId = 1;
    firebase.firestore().collection(`information`).doc(`${crosswalkId}`).get().then((snapshot) => {
        setCrosswalkData({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
    }, [crosswalkId]);
  
    return { crosswalkData, setCrosswalkData };
  };
