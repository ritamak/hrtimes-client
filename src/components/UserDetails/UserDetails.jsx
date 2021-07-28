import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles({
  media: {
    height: 500,
  },
});

function UserDetails(props) {
  const [userDetails, updateUserDetails] = useState(null);
  const id = props.match.params.id;
  const { onFollowUser, fetchingUser, updateStatus, user, updateUser } = props;

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        let userDetailsResponse = await axios.get(
          `${API_URL}/api/users/${id}`,
          { withCredentials: true }
        );
        let userResponse = await axios.get(`${API_URL}/api/profile`, {
          withCredentials: true,
        });

        updateUser(userResponse.data);
        updateStatus(false);
        updateUserDetails(userDetailsResponse.data);
      } catch (error) {
        console.log("Fetching user data failed", error);
        updateStatus(false);
      }
    })();
  }, []);

  if (!userDetails || fetchingUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>User Details</h1>

      <Paper elevation={3} className="cardDetailsWrapper">
        <Grid>
          <div>
            {user.following.includes(userDetails._id) ||
            user._id === userDetails._id ? (
              ""
            ) : (
              <Button
                onClick={() => {
                  onFollowUser(id);
                }}
                color="primary"
                variant="contained"
              >
                <PersonAddIcon />
                Follow
              </Button>
            )}
          </div>
          {userDetails.image && (
            <CardMedia className={classes.media} image={userDetails.image} />
          )}
          <Typography
            gutterBottom
            variant="h1"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {userDetails.username}
          </Typography>
          <Typography
            gutterBottom
            variant="h2"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {userDetails.firstName}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {userDetails.lastName}
          </Typography>
          <Typography variant="body2" component="h2" style={{ color: "black" }}>
            {userDetails.email}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {userDetails.country}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ fontWeight: "bold" }}
          >
            {userDetails.city}
          </Typography>
          {userDetails.interests.map((interest, index) => {
            return (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                key={index}
                style={{ fontWeight: "bold" }}
              >
                {interest}
              </Typography>
            );
          })}
          {userDetails.articles.map((article, index) => {
            return (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                key={index}
                style={{ fontWeight: "bold" }}
              >
                {article.title}
              </Typography>
            );
          })}
          {userDetails.comments.map((comment, index) => {
            return (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontWeight: "bold" }}
              >
                {comment.commentBody}
              </Typography>
            );
          })}
          {userDetails.following.map((user, index) => {
            return (
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                style={{ fontWeight: "bold" }}
              >
                {" "}
                <Link key={index} to={`/users/${user._id}`}>
                  {user.username}
                </Link>
              </Typography>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
}

export default UserDetails;
