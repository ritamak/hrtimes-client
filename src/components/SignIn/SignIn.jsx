import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleButton from "../GoogleButton/GoogleButton";
import Alert from "@material-ui/lab/Alert";

import "./SignIn.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  const { onSignIn, onGoogleSuccess, onGoogleFailure } = props;

  return (
    <Container component="main" maxWidth="xs" className="signInFormContainer">
      <CssBaseline />
      <div className={classes.paper}>
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
          {props.error && (
            <Alert variant="filled" severity="error" className="signInAlert">
              {props.error}
            </Alert>
          )}
          <Grid container justifyContent="center">
            <GoogleButton
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
            />
          </Grid>
          <Grid container>
            <Grid item>
              <Link className="form-link" to="/signup">
                Don't have an account? Sign Up!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
