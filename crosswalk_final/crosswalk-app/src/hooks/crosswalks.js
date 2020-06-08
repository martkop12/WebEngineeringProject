import { useState, useEffect } from "react";
import { firebase } from "../firebase";

export const useCrosswalks = () => {
  const [crosswalks, setCrosswalks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    firebase.firestore().collection("monitor").get().then((snapshot) => {
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
    

// export const useCrosswalk = (tripId, entryId) => {
//   const [entry, setEntry] = useState();

//   useEffect(() => {
//     const userId = 1;
//     firebase
//       .database()
//       .ref(`crosswalks/${userId}/${tripId}/${entryId}`)
//       .once("value", snapshot => {
//         setEntry({
//           id: snapshot.key,
//           ...snapshot.val()
//         });
//       });
//   }, [tripId, entryId]);

//   return { entry };
// };
