import React, { useState } from "react";
import Select from "react-select";
import { Button } from "@material-ui/core";
import { topStoriesTopics } from "../../data/data";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function EditProfile(props) {
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
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  const {
    updateUser,
    onEditProfile,
    user,
    onTopicChange,
    onDeleteComment,
    onDeleteArticle,
    onDeleteProfile,
    fetchingUser,
  } = props;

  const { interests, comments, articles } = user;
  const [form, updateForm] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();
    updateForm(true);
  };

  const handleUserName = (event) => {
    let newUserName = event.target.value;
    updateUser({ ...user, username: newUserName });
  };
  const handleFirstName = (event) => {
    let newFirstName = event.target.value;
    updateUser({ ...user, firstName: newFirstName });
  };

  const handleLastName = (event) => {
    let newLastName = event.target.value;
    updateUser({ ...user, lastName: newLastName });
  };

  const handleEmail = (event) => {
    let newEmail = event.target.value;
    updateUser({ ...user, email: newEmail });
  };
  const handleCountry = (event) => {
    let newCountry = event.target.value;
    updateUser({ ...user, country: newCountry });
  };
  const handleCity = (event) => {
    let newCity = event.target.value;
    updateUser({ ...user, city: newCity });
  };
  const handlePassword = (event) => {
    let newPassword = event.target.value;
    updateUser({ ...user, password: newPassword });
  };

  if (fetchingUser) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <>
        <div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <h1>Your info</h1>
            {!comments.length ? "" : <h5>your comments</h5>}
            {comments &&
              comments.map((comment, index) => {
                return (
                  <div key={index}>
                    <p>{comment.commentBody}</p>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        onDeleteComment(comment._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
            {!articles.length ? "" : <h5>your articles</h5>}
            {articles &&
              articles.map((article, index) => {
                return (
                  <div key={index}>
                    <p>{article.title}</p>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        onDeleteArticle(article._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
          </Container>
          {!form ? (
            <Container component="main" maxWidth="xs">
              <CssBaseline />

              <Button onClick={handleForm}>Edit Profile</Button>
            </Container>
          ) : (
            <>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={onEditProfile}
                  >
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
                          value={user.username}
                          onChange={handleUserName}
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
                          value={user.firstName}
                          onChange={handleFirstName}
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
                          value={user.lastName}
                          onChange={handleLastName}
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
                          value={user.email}
                          onChange={handleEmail}
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
                          value={user.country}
                          onChange={handleCountry}
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
                          value={user.city}
                          onChange={handleCity}
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
                          placeholder="re-enter your password"
                          onChange={handlePassword}
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
                      Edit Done
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          onDeleteProfile(user);
                        }}
                      >
                        Delete Account
                      </Button>
                    </Grid>
                    {props.error && <p className="error">{props.error}</p>}
                  </form>
                </div>
                <Box mt={5}></Box>
              </Container>
            </>
          )}
        </div>
      </>
    </div>
  );
}
