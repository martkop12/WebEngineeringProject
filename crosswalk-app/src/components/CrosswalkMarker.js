import React from "react";
import { Marker } from "react-google-maps";
import CrosswalkIcon from "../res/images/crossIconRound.png";
import { Redirect } from 'react-router-dom';



export default class CrosswalkMarker extends React.Component {
  state = { redirect: null };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <Marker
        onClick={() => this.setState({ redirect: "/crosswalks/" + this.props.id })}
        position={this.props.location}
        icon={CrosswalkIcon}
      >
      </Marker>
    );
  }
}