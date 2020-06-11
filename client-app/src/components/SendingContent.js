import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoadingCircle from './LoadingCircle';
import Notification from './Notification';
import {simulate} from '../services/hooks/simulation';

import socketIOClient from "socket.io-client";
import {AuthContext} from "../services/Auth";

const ENDPOINT = "http://localhost:5000";

const useStyles = makeStyles((theme) => ({

    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    title: {
      margin: theme.spacing(3, 3, 3),
      textAlign: 'center',
    }
    }));



export default function SendingContent(props) {
    
    const { currentUser } = useContext(AuthContext);    
    const classes = useStyles();
    const names = ['Vehicle', 'Pedestrian', 'Simulation'];
    const typo = ['car','pedestrian'];
    const [state,setState] = useState(false);
    const [crosswalks, setCrosswalks] = useState([]);


    const _getLocationAsync = async () => {
        let location = await navigator.geolocation.getCurrentPosition((position)=>{
          fetch('/api/world', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            id: currentUser.uid,
            info: typo[props.data.opt],
            location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }}),})
        .then(rsp =>{})
        .catch((err)=>{
            console.log(err);
        })
        },(error) =>{
            console.log('Error:', error);
        }) }

    useEffect(()=>{
        const socket = socketIOClient(ENDPOINT);
        socket.on("notifyInformation", data => {
            console.log(data);
            setCrosswalks([data]);
        });
        let myvar;
        if(props.data.opt == 2){
          myvar = setInterval(simulate, 3000, currentUser.uid);
        }else{
          myvar = setInterval(_getLocationAsync,3000);
        }
        
        return () => {          
          clearInterval(myvar);
        }
    })

    return(
         <Grid container>
           <Grid item xs={12} sm={6}>
             <Container component="main" maxWidth="xs">
               <div className={classes.paper}>
                    <Typography variant="h4" className={classes.title}>{names[props.data.opt]} Mode</Typography>
                    <Typography variant="h5" className={classes.title}>Sharing GPS Information...</Typography>
                    <LoadingCircle/>
               </div>
               <Button fullWidth variant="contained" color="inherit" className={classes.submit}
                 onClick={() => props.handleClick(null)}>
                   Stop Sharing
               </Button>
             </Container>
           </Grid>
           <Grid item xs={12} sm={6}>
               <div className={classes.paper}>
                 <Typography variant="h5" className={classes.title}>Notifications:</Typography>
                 <Notification vehicle={props.data.opt!=1? true : false} data={crosswalks}/>
               </div>
           </Grid>
           </Grid>);
}
