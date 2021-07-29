import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import GoogleButton from "../GoogleButton/GoogleButton";

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
    color: "white",
    background_color: "#6e6e6e",
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const { onSignIn, onGoogleSuccess, onGoogleFailure } = props;

  return (
    <Container component="main" maxWidth="xs">
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
          <GoogleButton
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ color: "white", background: "black" }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item>
              <Link
                className="form-link"
                to="/signup"
                style={{ color: "black" }}
              >
                Don't have an account? Sign Up!
              </Link>
            </Grid>
          </Grid>
          {props.error && <p className="error">{props.error}</p>}
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}

export default SignIn;
