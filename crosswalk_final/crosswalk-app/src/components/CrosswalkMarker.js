import React from "react";
import { Marker } from "react-google-maps";
import CrosswalkIcon from "../res/images/crossIconRound.png";
import { Link } from 'react-router-dom';


export default class CrosswalkMarker extends React.Component {

  render(){
    return(
        <Link to="/" >
            <Marker
                onClick={this.routeChange}
                position={this.props.location}
                icon={CrosswalkIcon}
            >
            </Marker>
      </Link>
        
    );
  }
}