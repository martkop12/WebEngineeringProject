import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { Link, useParams } from "react-router-dom";
// import { useEntries } from "../hooks/entries";
// import { useTrip } from "../hooks/trips";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

import { typography } from "@material-ui/system";
// import moment from "moment";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: "#FAFAFA",
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    margin: "auto",
    display: "flex",
    outline: 0,
    position: "relative",
    justifyContent: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: "#FAFAFA",
    padding: theme.spacing(6)
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    backgroundSize: "contain",
    height: 400,
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  startMonitoringButton: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    height: 58,
    padding: '0 30px',
    margin: 10,
    fontSize:25
  },

  userButton: {
    // background: 'linear-gradient(45deg, #FE6B8B 5%, #FF8E53 90%)',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 10
  },
  mainFeaturedPostContent: {
    position: "relative",

    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,

    }
  },

}));

const TripDetail = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>

        <Paper
          className={classes.mainFeaturedPost}
          style={{ backgroundImage: `url(https://www.lightguardsystems.com/wp-content/uploads/2015/01/Solar-wireless-RRFB-crosswalk-graphic.jpg)` }}
        >
          {/* Increase the priority of the hero background image */}
          {<img style={{ display: "none" }} src="https://www.lightguardsystems.com/wp-content/uploads/2015/01/Solar-wireless-RRFB-crosswalk-graphic.jpg" alt="img" />}
          <div className={classes.overlay} />

          <Grid container>
            <Grid item md={9}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  // className={classes.typography}
                  gutterBottom
                >
                  SPWS
                  </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  This site is used for monitoring crosswalks in the city
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
        <Container
          className={classes.cardGrid}
          style={{
              alignContent: "center",
              alignSelf: "center",
              justifyContent: "center"
            }}
          maxWidth="md"
        >
          <Link to="/crosswalks" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" className={classes.startMonitoringButton} size="large">
              Start monitoring!

            </Button>
          </Link>
          <br></br>
          {/* <Link to="/user" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" className={classes.userButton} size="large">
              User
            </Button>
          </Link> */}

        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};


export default TripDetail;
