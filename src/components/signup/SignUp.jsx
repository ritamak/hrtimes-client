import React from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { topStoriesTopics } from "../../data/data";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import GoogleButton from "../GoogleButton/GoogleButton";
import Alert from "@material-ui/lab/Alert";
import "./SignUp.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const {
    onSignUp,
    interests,
    onTopicChange,
    onGoogleSuccess,
    onGoogleFailure,
    error,
  } = props;

  return (
    <>
      <Container component="main" maxWidth="xs" className="signUpFormContainer">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography className="signUpHeader" variant="h3" gutterBottom>
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="uname"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="country"
                  name="country"
                  variant="outlined"
                  required
                  fullWidth
                  id="country"
                  label="country"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="city"
                  name="city"
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="city"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordHash"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  style={{ width: "100%" }}
                  onChange={onTopicChange}
                  closeMenuOnSelect={false}
                  defaultValue={[]}
                  label="selet interests"
                  isMulti
                  name="topics"
                  options={topStoriesTopics}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  multiValue={interests}
                />
              </Grid>
              <Grid item xs={12}>
                <FormHelperText>Upload your photo</FormHelperText>
                <Input
                  type="file"
                  name="myImage"
                  accept="image/png, image/jpg"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={`${classes.submit} formSignUpButton`}
            >
              Sign Up
            </Button>
            {error && (
              <Alert variant="filled" severity="error" className="signUpAlert">
                {error}
              </Alert>
            )}
            <Grid container justifyContent="center">
              <GoogleButton
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFailure}
                className="googleSignUpButton"
              />
            </Grid>
            <Grid container className="signInLinkContainer">
              <Grid item>
                <p className="signInFormText">
                  Already have an account?
                  <Link className="signInFormLink" to="/signin">
                    Sign In!
                  </Link>
                </p>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

export default SignUp;
