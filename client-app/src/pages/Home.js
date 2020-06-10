import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import SignUp from '../components/SignUp';
import {firebase} from '../services/firebase';
import { AuthContext, useFirebaseAuthentication} from '../services/Auth';

const useAuth = () => {
  const fireUser = firebase.auth().currentUser;
  const [user, setUser] = React.useState(fireUser);

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
    return () => {
      unsub();
    };
  });
  return user;
};

export default function Home(){

    const user = useAuth();
    return(
    <div>
        <NavBar loggedIn={user ? false : true}/>
        <SignUp/>
    </div>
    );


}