import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleButton from "../GoogleButton/GoogleButton";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";

import "./SignIn.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const { onSignIn, onGoogleSuccess, onGoogleFailure, error } = props;

  return (
    <Container component="main" maxWidth="xs" className="signInFormContainer">
      <div className={classes.paper}>
        <Typography className="signInHeader" variant="h3" gutterBottom>
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={onSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} formSignInButton`}
          >
            Sign In
          </Button>
          {error && (
            <Alert variant="filled" severity="error" className="signInAlert">
              {error}
            </Alert>
          )}
          <Grid container justifyContent="center">
            <GoogleButton
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
              className="googleSignInButton"
            />
          </Grid>
          <Grid container className="signUpLinkContainer">
            <Grid item>
              <p className="signUpFormText">
                Don't have an account?
                <Link className="signUpFormLink" to="/signup">
                  Sign Up!
                </Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
