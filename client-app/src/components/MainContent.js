import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SendingContent from './SendingContent';
import OpButtons from './OpButtons';

import { makeStyles } from '@material-ui/core/styles';
import { firebase as localFirebase } from "../services/firebase";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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



export default function MainContent() {
  const classes = useStyles();
  const [start,setStart] = useState(false);
  const [opt,setOpt] = useState(null);
  const handleOnClick = (id) => {
    setStart(!start);
    setOpt(id);
  }

  
  
    
  const HeaderData = () => {
        if(!start){
        return (<Typography variant="h3" className={classes.title} >WELCOME TO SPWS APP</Typography>);
        }else{
          return null;
        }}
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {HeaderData()}
        </Grid>
          {!start ? <OpButtons handleClick={handleOnClick}/> 
          : <SendingContent data={{opt}} handleClick={handleOnClick}/>}
      </Grid>
    </div>
  );
}