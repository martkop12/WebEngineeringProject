import { useState, useEffect } from "react";
import { firebase } from "../firebase";

// export const useCrosswalk = () => {
//   const [crosswalk, setCrosswalk] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);

//   useEffect(() => {
//     setIsFetching(true);
//     firebase.firestore().collection("information").get().then((snapshot) => {
//         let crosswalkList = [];
//         snapshot.docs.forEach(doc => {
//             // console.log(doc.id);
//             CrosswalkList.push({id: doc.id, ...doc.data().location})
//         })

//         if (JSON.stringify(crosswalkList) !== JSON.stringify(Crosswalk)) {
//             // console.log(CrosswalkList)

//             setCrosswalk(crosswalkList);
//           }
  
//           setIsFetching(false);
//     });
//     return () => {
//         firebase
//           .database()
//           .ref(`monitor`)
//           .off();
//       };
//     }, [crosswalk]);
//     return { crosswalk, isFetching };
// };
    
export const useCrosswalk = crosswalkId => {
    const [crosswalk, setCrosswalk] = useState();
    const [isFetching, setIsFetching] = useState(false);
      
        useEffect(() => {
            setIsFetching(true);

          firebase.firestore().collection(`information/${crosswalkId}`).get().then((snapshot) => {
                console.log(snapshot.doc.data());
              setCrosswalk({
                  id: snapshot.doc.key,
                  ...snapshot.doc.val()
              })
          });
        }, [crosswalkId]);
        setIsFetching(false);
      
        return { crosswalk, setCrosswalk };
      };
      
  

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
