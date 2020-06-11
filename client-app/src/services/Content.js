import React from "react";
import {Route} from "react-router-dom";
import Home from "../pages/Home";
import SignHome from "../pages/SignHome";
import {PrivateRoute} from "./PrivateRoute";




const Content = () => {
  return (
    <div>
        <PrivateRoute exact path="/" component={SignHome}/>
        <Route exact path="/login" component={Home} />
    </div>
  );
};

export default Content;