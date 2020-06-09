import { useState, useEffect } from "react";
import { firebase } from "../firebase";

export const useCrosswalks = () => {
  const [crosswalks, setCrosswalks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    firebase.firestore().collection("monitor").onSnapshot((snapshot) => {
        let crosswalksList = [];
        snapshot.docs.forEach(doc => {
            // console.log(doc.data().state_of_light);
            let stateOfLight = doc.data().state_of_light;
            crosswalksList.push({id: doc.id, stateOfLight,...doc.data().location})
        })

        if (JSON.stringify(crosswalksList) !== JSON.stringify(crosswalks)) {
            // console.log(crosswalksList)

            setCrosswalks(crosswalksList);
          }
  
          setIsFetching(false);
    });
    return () => {
        firebase
          .database()
          .ref(`monitor`)
          .off();
      };
    }, [crosswalks]);
    return { crosswalks, isFetching };
};

