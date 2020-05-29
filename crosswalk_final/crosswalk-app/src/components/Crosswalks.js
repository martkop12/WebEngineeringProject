import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./layout/Header";

import { Link, useParams } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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


  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
          <div className={classes.root}>

            <Link to="/crosswalks/1" style={{ textDecoration: "none" }}>
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
            </Link>
                
          </div>
        
      </main>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Crosswalk;
