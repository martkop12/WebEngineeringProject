import React from 'react';
import {Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotifCard from './NotifCard';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      padding: theme.spacing(2),
      margin: theme.spacing(1),
      flexGrow: 1,
    },
  }));
const Pedestrians = () => {
    return(
        <Typography variant="body1">Pedestrians does not receive notifications</Typography>
    );
}
export default function Notification(props){
    const classes = useStyles();
  


    return(
        <Paper className={classes.root} elevation={3}>
            {props.vehicle ? <NotifCard data={props.data}/> : Pedestrians()}
        </Paper>
    )
}