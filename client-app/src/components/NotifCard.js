import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));



export default function NotifCard(props) {
  const classes = useStyles();
  var counter = 0;
  
  return (
    <div className={classes.root}>
      {
          props.data.map((value) =>{
              let idStr = "panel" + counter++;
              return (
                <ExpansionPanel  key={idStr}>
                    <ExpansionPanelSummary  
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={idStr}
                    >
                    <Typography >Notification</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>Latitude: {value.crosswalkLocation.latitude}<br/>
                        Longitude: {value.crosswalkLocation.longitude}<br/>
                        Pedestrians: {value.pedestrianInArea ? 'Yes': 'No'}<br/>
                        Traffic Light: {value.trafficLight}
                          </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
              );
          })
      }
      
    </div>
  );
}