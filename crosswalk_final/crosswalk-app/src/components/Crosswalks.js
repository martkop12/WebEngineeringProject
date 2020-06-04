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
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";

  function createData(uid,latitude, longitude, stateOfLight ) {
    return {uid,latitude, longitude, stateOfLight};
  }

  const myPosition = createData(12,48.936497, 21.911423, "green")
  ;
  
  

  const MyMapComponent = withScriptjs(withGoogleMap((props) =>{

    const myPosition = createData(12,48.936497, 21.911423, "green");

    const mockedCrosswalks = [
        createData(1,48.935839, 21.912081,"green"),
        createData(2,48.936168, 21.911585, "green"),
        createData(3,48.935680, 21.911100,"red"),
        createData(4,48.935532, 21.912398, "green"),
        createData(5,48.935701, 21.910190,"red"),
        createData(6,48.936515, 21.910623, "green"),
        createData(7,48.936515, 21.912297, "red"),
    ]
      
    const markers = mockedCrosswalks.map( crosswalk => 
                    <CrosswalkMarker
                      key={crosswalk.uid}
                      location={{lat: crosswalk.latitude, lng: crosswalk.longitude}}
                    />);
                    
    return (
        <GoogleMap
            defaultZoom={18}
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
    root: {
        minWidth: 275,
        padding: theme.spacing(8),
        
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

  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  
}));

const Crosswalk = () => {
  const classes = useStyles();

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
          {console.log(myPosition)};
        
          {}
      {!myPosition ? (
              <MyMapComponent
                isMarkerShown
                lat={14}
                lng={45}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            ) : (
              <MyMapComponent
                isMarkerShown
                lat={myPosition.latitude}
                lng={myPosition.longitude}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            )}

          <div className={classes.root}>
                {console.log(mockedCrosswalks)}
                {mockedCrosswalks && (
                    mockedCrosswalks.map(crosswalk => (
                        <Link to={
                            { 
                                pathname: "/crosswalks/" + crosswalk.uid,
                                // myCustomProps: crosswalk
                            }
                        }>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Crosswalk
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Crosswalk num. + {crosswalk.uid}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Informarions about this crosswalk
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                        </Link>
                    ))
                )}
          {/* {mockedCrosswalks.map(({ crosswalk }) => (
                <Link to={
                    { 
                        pathname: "/crosswalks/" + crosswalk.uid,
                        myCustomProps: crosswalk
                    }
                }>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Crosswalk
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Crosswalk num. + {crosswalk.uid}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Informarions about this crosswalk
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                </Link>
              ))} */}

            {/* <Link to="/crosswalks/1" style={{ textDecoration: "none" }}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Crosswalk
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Crosswalk num. 1
                        </Typography>
                        <Typography variant="body2" component="p">
                            Informarions about this crosswalk
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                </Link>

                <Link to="/crosswalks/2" style={{ textDecoration: "none" }}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Crosswalk
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Crosswalk num. 2
                        </Typography>
                        <Typography variant="body2" component="p">
                            Informarions about this crosswalk
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                </Link>

                <Link to="/crosswalks/3" style={{ textDecoration: "none" }}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Crosswalk
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Crosswalk num. 3
                        </Typography>
                        <Typography variant="body2" component="p">
                            Informarions about this crosswalk
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Link> */}
                
          </div>
        
      </main>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Crosswalk;
