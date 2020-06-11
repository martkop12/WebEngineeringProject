import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignInDialog from './SignInDialog';
import {firebase} from '../services/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar (props) {
  
  
  
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  


  

  const renderAuthButton = () =>{
    if(props.loggedIn){
      return <Button color="inherit" onClick={handleClickOpen}>Login</Button>
    }else {
      return <Button color="inherit" onClick={handleLogout}>Logout</Button>}
  }
  const handleLogout = () => {
    
    firebase.auth().signOut()
    .then(status => {
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SPWS APP
          </Typography>
          {renderAuthButton()}
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <SignInDialog/>
        </DialogContent>
      </Dialog>
    </div>
  );
}