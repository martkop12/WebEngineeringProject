import { useState, useEffect } from "react";
import { firebase } from "../firebase";

// export const useCrosswalk = (crosswalkId) => {
//   const [crosswalkData, setCrosswalkData] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
// console.log("Called")

//   useEffect(() => {
//     setIsFetching(true);
//     firebase.firestore().collection(`information`).doc(`${crosswalkId}`).get().then((snapshot) => {      
//         let crossData = snapshot.data();
//         setCrosswalkData(crossData);
//         setIsFetching(false);         
//     });
//     return () => {
//         firebase
//           .database()
//           .ref(`information`)
//           .off();
//       };
//     }, [crosswalkData]);
//     return { crosswalkData, isFetching };
// };

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
    
// export const useCrosswalk = crosswalkId => {
//     const [crosswalk, setCrosswalkData] = useState();
//     const [isFetching, setIsFetching] = useState(false);
      
//         useEffect(() => {
//             setIsFetching(true);

//           firebase.firestore().collection(`information/${crosswalkId}`).get().then((snapshot) => {
//                 console.log(snapshot.doc.data());
//               setCrosswalkData({
//                   id: snapshot.doc.key,
//                   ...snapshot.doc.val()
//               })
//           });
//         }, [crosswalkId]);
//         setIsFetching(false);
      
//         return { crosswalk, setCrosswalkData };
//       };
      
  

// export const useCrosswalk = (tripId, entryId) => {
//   const [entry, setEntry] = useState();

//   useEffect(() => {
//     const userId = 1;
//     firebase
//       .database()
//       .ref(`Crosswalk/${userId}/${tripId}/${entryId}`)
//       .once("value", snapshot => {
//         setEntry({
//           id: snapshot.key,
//           ...snapshot.val()
//         });
//       });
//   }, [tripId, entryId]);

//   return { entry };
// };
