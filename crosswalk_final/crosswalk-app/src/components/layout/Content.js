import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import User from "../User"
import Home from "../Home"
import Crosswalks from "../Crosswalks"
import Crosswalk from "../Crosswalk"


const Content = () => {
  return (
    <div>
      <Route exact path={"/"} component={Home} />
      <Route exact path="/user" component={User} />
      <Route exact path="/crosswalks" component={Crosswalks} />
      <Route exact path="/crosswalks/:crosswalkId" component={Crosswalk} />
    </div>
  );
};

export default Content;
