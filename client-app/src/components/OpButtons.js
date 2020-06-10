import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

export default function OpButtons(props) {
    const classes = useStyles();
    
    return(
          <Grid item xs={12}>
          <Container component="main" maxWidth="xs">
            <Button fullWidth variant="contained" color="inherit" className={classes.submit}
            onClick={() => props.handleClick(0)}>
                Join as Vehicle
            </Button>
            <Button fullWidth variant="contained" color="inherit" className={classes.submit}
            onClick={() => props.handleClick(1)}>
                Join as Pedestrian
            </Button>
            <Button fullWidth variant="contained" color="inherit" className={classes.submit}
            onClick={() => props.handleClick(2)}>
                Start Simulation
            </Button>
          </Container>
          </Grid>
    );
}