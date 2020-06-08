import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./layout/Header";
// import { render } from "react-dom";
import { Link, useParams } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CrosswalkMarker from "./CrosswalkMarker"
import { useCrosswalks } from "../hooks/crosswalks";
import { firebase } from "../firebase";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import CrosswalkIcon from "../res/images/crossIconRound.png";

import BeachAccessIcon from '@material-ui/icons/BeachAccess';


import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";

//   const {crosswalks, setCrosswalks} = useCrosswalks();


  function createData(uid,latitude, longitude, stateOfLight ) {
    return {uid,latitude, longitude, stateOfLight};
  }

  const myPosition = createData(12,48.936497, 21.911423, "green")
  ;
  
  

  const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
    const {crosswalks, setCrosswalks} = useCrosswalks();
    console.log(crosswalks)

    const myPosition = createData(12,48.936497, 21.911423, "green");

    const markers = crosswalks.map( crosswalk => 
                    <CrosswalkMarker
                      key={crosswalk.id}
                      location={{lat: crosswalk.latitude, lng: crosswalk.longitude}}
                    />);
                    
    return (
        <GoogleMap
            defaultZoom={17}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
            
        >
            {props.isMarkerShown && (
            <Marker key={myPosition.uid} position={{ lat: props.lat, lng: props.lng }} />
            )}
            
            {markers}
        </GoogleMap>
      );
    }
  ))



const useStyles = makeStyles(theme => ({
      customGrid: {
           padding: theme.spacing(1),
          flexGrow: 1,
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
    // padding: theme.spacing(0),
    // textAlign: 'center',
    maxHeight: "600px",
    width: "100%"
    //  position: 'relative',
    // overflow: 'auto',
    //   maxWidth: "80%",
  },
  list: {
    width: "100%"
  }
  
}));

const Crosswalks = () => {
  const classes = useStyles();
  const {crosswalks, setCrosswalks} = useCrosswalks();
  console.log(crosswalks)
//   firebase.firestore().collection("monitor").get().then((snapshot) => {
//       snapshot.docs.forEach(doc => {
//           console.log(doc.data().location)
//       })
//   })

  const mockedCrosswalks = [
    createData(1,48.935839, 21.912081,"green"),
    createData(2,48.936168, 21.911585, "green"),
    createData(3,48.935680, 21.911100,"red"),
    createData(4,48.935532, 21.912398, "green"),
    createData(5,48.935701, 21.910190,"red"),
    createData(6,48.936515, 21.910623, "green"),
    createData(7,48.936515, 21.912297, "red"),
]
  
  const crosswalk = {
    location: {
        latitude:45,
        longitude:45
    },
    
   
  };
//   const { entry } = useEntry(tripId, entryId);


  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
          {console.log(myPosition)}
          <div className={classes.customGrid}>
                <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}>
                    <Paper className={classes.paper}>
                        <Grid className={classes.crosswalkList} item  >
                            <List className={classes.list}>
                            {crosswalks && (
                                crosswalks.map(crosswalk => (
                                    <Link className={classes.link} to={
                                        { 
                                            pathname: "/crosswalks/" + crosswalk.id,
                                        }
                                    }>
                                    
                                        <ListItem className={classes.listItem} button>
                                            <ListItemAvatar>
                                                <Avatar alt="Crosswalk" src="../res/images/crossIconRound.png" />
                                            </ListItemAvatar>
                                            <ListItemText primary={"Crosswalk " + crosswalk.id} secondary={"Light "+crosswalk.stateOfLight} />
                                        </ListItem>
                                    
                                    </Link>
                                ))
                            )}
                            </List>
                        </Grid>
                    </Paper>
                        <Grid item xs={6} sm={8}>
                        {!myPosition ? (
                            <MyMapComponent
                                isMarkerShown
                                lat={14}
                                lng={45}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `600px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                            ) : (
                            <MyMapComponent
                                isMarkerShown
                                lat={myPosition.latitude}
                                lng={myPosition.longitude}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `600px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
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
