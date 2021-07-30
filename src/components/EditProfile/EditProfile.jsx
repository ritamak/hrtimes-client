import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "@material-ui/core";
import { topStoriesTopics } from "../../data/data";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import Paper from "@material-ui/core/Paper";
import "./EditProfile.css";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Loading from "../Loading/index";

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
    updateComments,
    updateArticles,
    interests,
    comments,
    articles,
  } = props;

  const { following } = user;

  useEffect(() => {
    (async () => {
      try {
        let commentResponse = await axios.get(`${API_URL}/api/comments`, {
          withCredentials: true,
        });
        let articleResponse = await axios.get(`${API_URL}/api/articles`, {
          withCredentials: true,
        });

        updateComments(commentResponse.data);
        updateArticles(articleResponse.data);
      } catch (err) {
        console.log("Fetching data failed", err);
      }
    })();
  }, []);

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
    return <Loading />;
  }

  return (
    <Container component="main" maxWidth="sm" className="editProfileContainer">
      <Container className="profileInfoContainer">
        <Typography className="editProfileHeader" variant="h2" gutterBottom>
          User Details
        </Typography>
        <Paper elevation={3} className="userInfoCardWrapper">
          <Typography className="profileInfoHeaders" variant="h3" gutterBottom>
            Account
          </Typography>
          <Grid container className="userInfo">
            <Grid item xs={12} md={6} className="firstGridOfUserInfo">
              <CardMedia
                className={`${classes.media} profileInfoImage`}
                component="img"
                alt="profile-image"
                image={user.image}
              />
              <p className="accountTitles">
                Username:
                <Typography gutterBottom variant="h5">
                  {user.username}
                </Typography>
              </p>
              <p className="accountTitles">
                First name:
                <Typography gutterBottom variant="h5">
                  {user.firstName}
                </Typography>
              </p>
              <p className="accountTitles">
                Last name:
                <Typography gutterBottom variant="h5">
                  {user.lastName}
                </Typography>
              </p>
              <p className="accountTitles">
                Email:
                <Typography variant="h5">{user.email}</Typography>
              </p>
              <p className="accountTitles">
                Country:
                <Typography gutterBottom variant="h5">
                  {user.country}
                </Typography>
              </p>
              <p className="accountTitles">
                City:
                <Typography gutterBottom variant="h5">
                  {user.city}
                </Typography>
              </p>
            </Grid>
            <Grid item xs={12} md={6} className="secondGridOfUserInfo">
              <Typography variant="h4" className="profileInfoHeaders">
                Your interests:
              </Typography>
              {user.interests.map((interest, index) => {
                return (
                  <Typography
                    className="profileInfoInterests"
                    gutterBottom
                    variant="h5"
                    key={index}
                  >
                    <i class="fas fa-arrow-right"></i> {interest}
                  </Typography>
                );
              })}
              {following.length > 0 && <h1>Following</h1>}
              {user.following.map((people, index) => {
                return (
                  <Typography
                    className="profileInfoFollowings"
                    gutterBottom
                    variant="h5"
                    key={index}
                  >
                    <i class="fas fa-arrow-right"></i> {people.username}
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      {!form ? (
        <Container component="main" maxWidth="xs">
          {!interests ? (
            <h1>Add your interests, country and city to your profile info</h1>
          ) : (
            ""
          )}
          <CssBaseline />
          <Grid className="showEditProfileButtonContainer">
            <Button
              className="showEditFormButton"
              onClick={handleForm}
              variant="contained"
              color="primary"
            >
              <i class="fas fa-user-edit"></i> Edit Profile
            </Button>
          </Grid>
        </Container>
      ) : (
        <>
          <Container
            component="main"
            maxWidth="xs"
            className="editProfileFormContainer"
          >
            <CssBaseline />
            <div className={classes.paper}>
              <Typography gutterBottom variant="h3">
                Edit Your Info
              </Typography>
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
                  <Grid item xs={12} sm={6}>
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
                  className={`${classes.submit} editFormEditButton`}
                >
                  Done
                </Button>
                <Grid container className="editFormDeleteButtonContainer">
                  <Button
                    className="editFormDeleteButton"
                    variant="contained"
                    color="secondary"
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

      <Grid className="bigWrapperCommentArticles">
        <Grid container className="wrapperCommentsArticles">
          {user.comments.length > 0 && (
            <Grid item xs={12} sm={6} className="commentsWrapperTwo">
              <h2>Your comments:</h2>
              <Grid container>
                {user.comments.length &&
                  user.comments.map((comment, index) => {
                    return (
                      <Grid item xs={10} className="editDeleteArticlesComments">
                        <Typography variant="h5">
                          {comment.commentBody}
                        </Typography>
                        <Tooltip title="Delete">
                          <IconButton
                            className="articleCommentDeleteIcon"
                            aria-label="delete"
                            onClick={() => {
                              onDeleteComment(comment._id);
                            }}
                          >
                            <i class="fas fa-trash-alt"></i>
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          )}
          {user.articles.length > 0 && (
            <Grid item xs={12} sm={6} className="myArticleBox">
              <h2>Your articles:</h2>
              <Grid container>
                {user.articles.length > 0 &&
                  user.articles.map((article, index) => {
                    return (
                      <Grid item xs={10} className="editDeleteArticlesComments">
                        <Typography variant="h5">{article.title}</Typography>
                        <div>
                          <Tooltip title="Delete">
                            <IconButton
                              className="articleCommentDeleteIcon"
                              aria-label="delete"
                              onClick={() => {
                                onDeleteArticle(article._id);
                              }}
                            >
                              <i class="fas fa-trash-alt"></i>
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit">
                            <Link
                              className="articleEditButton"
                              to={`/article/${article._id}/edit`}
                            >
                              <IconButton
                                className="articleEditIcon"
                                aria-label="edit"
                              >
                                <i class="fas fa-edit"></i>
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </div>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
