import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import User from "../User"
import Home from "../Home"
import Crosswalks from "../Crosswalks"

const Content = () => {
  return (
    <div>
      <Route exact path={"/"} component={Home} />
      <Route exact path="/user" component={User} />
      <Route exact path="/crosswalks" component={Crosswalks} />
    </div>
  );
};

export default Content;
