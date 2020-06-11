import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import User from "../User"
import Home from "../Home"
import Crosswalks from "../Crosswalks"
import Crosswalk from "../Crosswalk"
import SignIn from "../SignIn"
import SignUp from "../SignUp"
import PrivateRoute from "../../PrivateRoute";


const Content = () => {
  return (
    <div>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/user" component={User} />
      <PrivateRoute exact path="/crosswalks" component={Crosswalks} />
      <PrivateRoute exact path="/crosswalks/:crosswalkId" component={Crosswalk} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  );
};

export default Content;
