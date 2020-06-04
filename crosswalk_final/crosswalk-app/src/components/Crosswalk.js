import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Header from "./layout/Header";
import ReactDOM from 'react-dom' 

import { useParams } from "react-router-dom";


// let { tripId, entryId } = useParams();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  trafficCircle:{
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      borderRadius: "100%",
      position: "relative",
      height: "40px",
      width: "40px",

  },
 
  
}));

export default function Crosswalk() {
  const classes = useStyles();
  const circles = document.getElementsByClassName(classes.trafficCircle)
  let activeLight = 2;
  let currentLight = circles[activeLight];


    setInterval(() => {
        changeLight();
    }, 5000);

    function setInitialLight(){
        activeLight = 0;
        currentLight = circles[0]
        currentLight.style.backgroundColor=(currentLight.getAttribute('color'));
        currentLight.style.boxShadow=(currentLight.getAttribute('boxShadow'))
    }

    function changeLight() {
        console.log(circles);

        circles[activeLight].style.backgroundColor= "rgba(0, 0, 0, 0.3)";
        circles[activeLight].style.boxShadow= "0 0 0 0 ";
        // circles[activeLight].className = 'circle';
        activeLight++;
        
        if(activeLight > 2) {
            activeLight = 0;
        }
	
    currentLight = circles[activeLight];
    console.log(currentLight.style.backgroundColor);
    // currentLight.style = {
    //     bv
    // }

    currentLight.style.backgroundColor=(currentLight.getAttribute('color'));
    currentLight.style.boxShadow=(currentLight.getAttribute('boxShadow'));

}


  return (     
    <div className={classes.root}>
    <Header />
        <Paper
                className={classes.mainFeaturedPost}
                style={{ backgroundImage: `url(https://st3.depositphotos.com/16229314/19138/v/1600/depositphotos_191385946-stock-illustration-street-crossroad-vector-cartoon-illustration.jpg)` }}
            >
                {/* Increase the priority of the hero background image */}
                {<img style={{ display: "none" }} src="https://st3.depositphotos.com/16229314/19138/v/1600/depositphotos_191385946-stock-illustration-street-crossroad-vector-cartoon-illustration.jpg" alt="img" />}
                <div className={classes.overlay} />

                <Grid container>
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
                   
                    <Typography color="inherit" paragraph>
                        {/* {moment("12.06.1998").format("DD/MM/YYYY")} -{" "}
                        {moment("12.06.1998").format("DD/MM/YYYY")} */}

                        {/* //  {"12.06.1998"} -{" "}
                        // {"12.06.1998"} */}
                    </Typography>
                    </div>
                </Grid>
                </Grid>
            </Paper>

      <div style={{ padding: 40 }}>                
      <Grid container spacing={3}>
        <Grid item xs>
            <Paper className={classes.paper}>
                <Typography variant= "h2" color="textSecondary">
                    Cars
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <div className={classes.trafficLightContainer}>
                            <div className={classes.trafficCircle} color="#c0392b" boxShadow="0 0 20px 5px #c0392b" ></div>
                            <div className={classes.trafficCircle} color="#f1c40f"  boxShadow="0 0 20px 5px #f1c40f"></div>
                            <div className={classes.trafficCircle} color="#2ecc71"  boxShadow="0 0 20px 5px #2ecc71"></div>
                        </div>
                    </Grid>
                    <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                </Grid>
                
                
            </Paper>
        </Grid>
        <Grid item xs>
            <Paper className={classes.paper}>
                <Typography variant= "h2" color="textSecondary">
                    Pedestrians
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <div className={classes.trafficLightContainer}>
                            <div className={classes.trafficCircle} color="#c0392b" boxShadow="0 0 20px 5px #c0392b" ></div>
                            <div className={classes.trafficCircle} color="#f1c40f"  boxShadow="0 0 20px 5px #f1c40f"></div>
                            <div className={classes.trafficCircle} color="#2ecc71"  boxShadow="0 0 20px 5px #2ecc71"></div>
                        </div>
                    </Grid>
                    <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        
      </Grid>
      
      </div>
    </div>
  );
}