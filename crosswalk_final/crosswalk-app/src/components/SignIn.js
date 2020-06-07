import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import * as firebase from "firebase/app";
import React, { useCallback, useContext, useState } from "react";
import GoogleLogin from "react-google-login";
import { Redirect, withRouter } from "react-router";
import LinearProgress from "@material-ui/core/LinearProgress";

import { AuthContext } from "../Auth";
import { firebase as localFirebase } from "../firebase";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = ({ history }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(
    async event => {
      setIsLoading(true);
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        setIsLoading(true);
        history.push("/");
      } catch (error) {
        setIsLoading(true);
        alert(error);
      }
    },
    [history]
  );

  const handleGoogleLogin = response => {
    if (response) {
      const { givenName, familyName } = response.profileObj;

      const credential = firebase.auth.GoogleAuthProvider.credential(
        response.tokenId,
        response.accessToken
      );
      firebase.auth().signInWithCredential(credential);
      setIsLoading(false);

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const { uid, photoURL, email } = user;
          localFirebase
            .database()
            .ref(`users/${uid}`)
            .once("value", snapshot => {
              if (!snapshot.exists()) {
                firebase
                  .database()
                  .ref("users/" + uid)
                  .set({
                    firstName: givenName,
                    lastName: familyName,
                    email: email,
                    imageUrl: photoURL
                  });
              } else {
                console.log("User has been already registered!");
              }
            });
        }
      });
    }
  };

  const handleGoogleError = response => {
    setIsLoading(false);
    console.log(response);
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {isLoading && <LinearProgress />}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Prihlásiť sa
          </Typography>
          <form className={classes.form} onSubmit={handleLogin} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Emailová adresa"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Heslo"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamätať si ma"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Prihlásiť sa
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signup" variant="body2">
                  {"Nemáš účet? Zaregistruj sa!"}
                </Link>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
        <Container
          align="center"
          style={{ paddingTop: 40 }}
          onPress={() => {
            console.log("dasd");
            setIsLoading(true);
          }}
        >
          <GoogleLogin
            clientId="675342843605-eek4n9el01spgqbpu8n331mf5u3hl9mi.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleError}
            cookiePolicy={"single_host_origin"}
          />
        </Container>
      </Container>
    </>
  );
};

export default withRouter(SignIn);
