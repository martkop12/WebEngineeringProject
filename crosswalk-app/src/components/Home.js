import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ImageMain from '../res/images/3519.jpg';


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
    backgroundColor: theme.palette.grey[850],
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
    height: 58,
    padding: '0 30px',
    margin: 10,
    fontSize:25
  },

  userButton: {

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
          style={{ backgroundImage: `url(${ImageMain})` }}
        >
          {/* Increase the priority of the hero background image */}
          {<img style={{ display: "none" }} src={ImageMain} alt="img" />}
          <div className={classes.overlay} />

          <Grid container>
            <Grid item md={9}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h1"
                  variant="h2"
                  color="inherit"
                  // className={classes.typography}
                  gutterBottom
                >
                  SPWS
                  </Typography>
                <Typography variant="h4" color="inherit" paragraph>
                  This site is used for monitoring crosswalks in the city
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
