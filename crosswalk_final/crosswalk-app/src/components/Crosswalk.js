import React from 'react';
import { useState, useEffect } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Header from "./layout/Header";
import CrosswalkTable from './CrosswalkTable';
import { firebase } from "../firebase";

import { useParams } from "react-router-dom";
import { useCrosswalk, useCrosswalkLight } from '../hooks/crosswalk';


// let { tripId, entryId } = useParams();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    // minWidth: 400,
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  cars: {
    paddingTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  pedestrians: {
    paddingTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    backgroundSize: "contain",
    height: 350,
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  trafficLightContainer: {
    backgroundColor: "#2c3e50",
    borderRadius: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "15px 0",
    height: "200px",
    width: "70px",
  },
  trafficCircle: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "100%",
    position: "relative",
    height: "40px",
    width: "40px",
  },
  trafficLightGrid: {
    textAlign: "-webkit-center"

  },
  emptyTrafficGrid: {
    height: "200px"
  },
  headers: {
    textAlign: "center"
  }


}));

export default function Crosswalk () {
  const { crosswalkId } = useParams();
  // console.log(crosswalkId)
  const { crosswalkData } = useCrosswalk(crosswalkId);
  // console.log(crosswalkData)

  const { crosswalkLight } = useCrosswalkLight(crosswalkId);
  const [activeLight, setActiveLight] = useState(0);
  const previousActive = usePrevious(activeLight);
  const [crossLoc, setCrossLoc ] = useState(null);

  function usePrevious(value) {
    const ref = React.useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const classes = useStyles();
  const circles = document.getElementsByClassName(classes.trafficCircle)
  // let activeLight = 0;
  let currentLight = circles[activeLight];
  const [checked, setChecked] = useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    firebase.firestore().collection(`monitor`).doc(`${crosswalkId}`).onSnapshot((snapshot) => {
      setCrossLoc(snapshot.data().location)
      console.log(snapshot.data().location)
      });
  },[]);


  
  useEffect(() => {
    crosswalkLight &&(
      crosswalkLight.stateOfLight &&(
        // getLight(crosswalkLight) !== activeLight &&(
          setLight(crosswalkLight.stateOfLight)
        )
      )

  });

  function getLight(color){
    if (color === 'red') {
      return 0;
    } else if (color === 'orange') {
      return 1;
    } else  if (color === 'green') {
      return 2;
    } else return null;
  };

  function setLight(color) {
    setActiveLight(getLight(color));

    circles[previousActive].style.backgroundColor= "rgba(0, 0, 0, 0.3)";
    circles[previousActive].style.boxShadow= "0 0 0 0 ";

    circles[activeLight].style.backgroundColor = ( circles[activeLight].getAttribute('color'));
    circles[activeLight].style.boxShadow = ( circles[activeLight].getAttribute('boxShadow'))
  };

  return (
    <React.Fragment>
    <div className={classes.root}>
      <Header />
      <Paper
        className={classes.mainFeaturedPost}
        style={{ backgroundImage: `url(https://st3.depositphotos.com/16229314/19138/v/1600/depositphotos_191385946-stock-illustration-street-crossroad-vector-cartoon-illustration.jpg)` }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} src="https://st3.depositphotos.com/16229314/19138/v/1600/depositphotos_191385946-stock-illustration-street-crossroad-vector-cartoon-illustration.jpg" alt="img" />}
        <div className={classes.overlay} />

        <Grid >
          <Grid item md={12}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                align="center"
                color="textPrimary"
                // className={classes.typography}
                gutterBottom
              >
                Crosswalk
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <div style={{ padding: 40 }}>
        <Grid direction="column"  spacing={3}>
        {/* <Paper className={classes.paper}> */}

          <Grid item xs>
              <Typography className={classes.headers} variant="h2" color="textPrimary">
                Cars
                </Typography>
              <Grid justify="center" className={classes.cars} container spacing={3}>
                <Grid className={classes.trafficLightGrid} item xs={2}>
                  <div className={classes.trafficLightContainer} >
                    <div className={classes.trafficCircle} color="#c0392b" boxShadow="0 0 20px 5px #c0392b" ></div>
                    <div className={classes.trafficCircle} color="#F1B00F" boxShadow="0 0 20px 5px #F1B00F"></div>
                    <div className={classes.trafficCircle} color="#2ecc71" boxShadow="0 0 20px 5px #2ecc71"></div>
                  </div>
                </Grid>
                <Grid
                direction="column"
                alignItems="center"
                  justify="center"
                  style= {{
                    alignSelf: "center"
                  }}
                 item xs>
                { crosswalkData && (
                  // console.log(crosswalkData),
                  crosswalkData.cars ? (
                    <CrosswalkTable
                    type= {"cars"}
                    crossLocation= {crossLoc}
                    crosswalkData={crosswalkData.cars} />
                  ) : (
                      <Typography style= {{
                        textAlign: "center"
                      }} variant="h4" color="textSecondary">
                          No car is near this crosswalk
                      </Typography>
                    )
                )}
                </Grid>
                <Grid className={classes.emptyTrafficGrid} item xs={2}/>
              </Grid>
            {/* </Paper> */}
          </Grid>
          <Grid  item xs>
            {/* <Paper className={classes.paper}> */}
              <Typography className={classes.headers} variant="h2" color="textPrimary">
                Pedestrians
                </Typography>
              <Grid justify="center" className={classes.pedestrians} container spacing={3}>
                <Grid className={classes.emptyTrafficGrid} item xs={2}/>
                <Grid
                  direction="column"
                  alignItems="center"
                    justify="center"
                    style= {{
                      alignSelf: "center"
                    }}
                  item xs>
                  { crosswalkData && (
                    // console.log(crosswalkData),
                    crosswalkData.pedestrians ? (
                      <CrosswalkTable
                      type= {"pedestrians"}
                      crossLocation= {crossLoc}
                      crosswalkData={crosswalkData.pedestrians} />
                    ) : (
                        <Typography style= {{
                          textAlign: "center"
                        }} variant="h4" color="textSecondary">
                            No pedestrian is near this crosswalk
                        </Typography>
                      )
                  )}
                </Grid>
                <Grid className={classes.emptyTrafficGrid} item xs={2}/>
              </Grid>
            {/* </Paper> */}
          </Grid>
        </Grid>
      </div>
    </div>
    </React.Fragment>
  );
}