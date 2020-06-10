import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



const OpButtons = () =>{
    if(!start){
    return(
          <Grid item xs={12}>
          <Container component="main" maxWidth="xs">
            <Button fullWidth variant="contained" color="inherit" className={classes.submit}
            onClick={() => handleClick(1)}>
                Join as Vehicle
            </Button>
            <Button fullWidth variant="contained" color="inherit" className={classes.submit}
            onClick={() => handleClick(2)}>
                Join as Pedestrian
            </Button>
            <Button fullWidth variant="contained" color="inherit" className={classes.submit}
            onClick={() => handleClick(3)}>
                Start Simulation
            </Button>
          </Container>
          </Grid>
    );}
    else{
       return(
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Container component="main" maxWidth="xs">
                  <div className={classes.paper}>
                    <Typography variant="h5" className={classes.title}>Sharing GPS Information...</Typography>
                    <LoadingCircle/>
                  </div>
                  <Button fullWidth variant="contained" color="inherit" className={classes.submit}
                    onClick={() => handleClick(null)}>
                      Stop Sharing
                  </Button>
                </Container>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <div className={classes.paper}>
                    <Typography variant="h5" className={classes.title}>Notifications:</Typography>
                  </div>
              </Grid>
              </Grid>);
    }
  }