import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import User from "../User"

const Content = () => {
  return (
    <div>
      <Route exact path={"/"} component={User} />
      <Route exact path="/user" component={User} />
    </div>
  );
};

export default Content;
