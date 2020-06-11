import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./layout/Header";
import { Link } from "react-router-dom";
import CrosswalkMarker from "./CrosswalkMarker"
import { useCrosswalks } from "../hooks/crosswalks";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


function createData(uid, latitude, longitude, stateOfLight) {
  return { uid, latitude, longitude, stateOfLight };
}

//this need to be changed for current location after we have all appropiate data
// const myPosition = createData(12, 48.936497, 21.911423, "green");


const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const { crosswalks, setCrosswalks } = useCrosswalks();

  // const myPosition = createData(12, 48.936497, 21.911423, "green");

  const markers = crosswalks.map(crosswalk =>
    <CrosswalkMarker
      key={crosswalk.id}
      id={crosswalk.id}
      location={{ lat: crosswalk.latitude, lng: crosswalk.longitude }}
    />);


  return (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: props.lat, lng: props.lng }}

    >
      {/* {props.isMarkerShown && (
        <Marker key={myPosition.uid} position={{ lat: props.lat, lng: props.lng }} />
      )} */}

      {markers}
    </GoogleMap>
  );
}
))





const Crosswalks = () => {
  const classes = useStyles();
  const { crosswalks, setCrosswalks } = useCrosswalks();
  console.log(crosswalks)

  const crosswalkss = undefined;

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        <div className={classes.customGrid}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}>
            {crosswalks && (
              <Paper className={classes.paper}>
                <Grid className={classes.crosswalkList} item  >
                  <List className={classes.list}>
                    {crosswalks.map(crosswalk => (
                      <Link className={classes.link} to={
                        {
                          pathname: "/crosswalks/" + crosswalk.id,
                        }
                      }>

                        <ListItem className={classes.listItem} button>
                          <ListItemAvatar>
                            {/* <CrosswalkIcon></CrosswalkIcon> */}
                            <Avatar alt="Crosswalk" src="https://images.clipartlogo.com/files/istock/previews/1052/105247503-crosswalk-icon-crossing-street-sign.jpg" />
                          </ListItemAvatar>
                          <ListItemText primary={"Crosswalk " + crosswalk.id} secondary={"Light " + crosswalk.stateOfLight} />
                        </ListItem>

                      </Link>
                    ))}
                  </List>
                </Grid>
              </Paper>
            )}
            <Grid item xs={6} sm={8}>
              {crosswalks ? (
                (crosswalks[0] &&
                  <MyMapComponent
                    isMarkerShown
                    lat={crosswalks[0].latitude}
                    lng={crosswalks[0].longitude}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                )
              ) : (

                  <Typography style={{
                    textAlign: "center"
                  }} variant="h4" color="textSecondary">
                    No crosswalks registered
                  </Typography>
                )}
            </Grid>
          </Grid>
        </div>
      </main>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Crosswalks;

const useStyles = makeStyles(theme => ({
  customGrid: {
    padding: theme.spacing(1),
    flexGrow: 1,
    width:'100%'
    //   backgroundColor: theme.palette.text.secondary
  },
  card: {
    backgroundColor: "#0693E3",
    margin: theme.spacing(4)
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  footer: {
    backgroundColor: "#FAFAFA",
    padding: theme.spacing(6)
  },

  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    maxHeight: "600px",
    position: 'relative',
    overflow: 'auto',
    maxWidth: "80%",

  },
  crosswalkList: {
    maxHeight: "600px",
    width: "100%"
    //  position: 'relative',
    // overflow: 'auto',
    //   maxWidth: "80%",
    // padding: theme.spacing(0),
    // textAlign: 'center',
  },
  list: {
    width: "100%"
  }

}));