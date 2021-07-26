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

function SignUp(props) {
  const { onSignUp, interests, onTopicChange } = props;

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={onSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid>
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
              className={classes.submit}
              style={{ color: "white", background: "black" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  className="form-link"
                  to="/signin"
                  variant="body2"
                  style={{ color: "black" }}
                >
                  Already have an account? Sign in!
                </Link>
              </Grid>
            </Grid>
            {props.error && <p className="error">{props.error}</p>}
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </>
  );
}

export default SignUp;
