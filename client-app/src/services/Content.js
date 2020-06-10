import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import SignHome from "../pages/SignHome";
import {PrivateRoute} from "./PrivateRoute";
import { AuthContext } from "../services/Auth";



const Content = () => {
  return (
    <div>
      <Route exact path="/" component={SignHome}/>
      <Route exact path="/login" component={Home} />
    </div>
  );
};

export default Content;