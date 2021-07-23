import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/SignIn/SignIn";
import { API_URL } from "./config";
import SignUp from "./components/signup/SignUp";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/EditProfile/EditProfile";
import CreateArticle from "./components/CreateArticle/CreateArticle";
import CreatedArticles from "./components/CreatedArticles/CreatedArticles";
import Navbar from "./components/Navbar/Navbar";

function App(props) {
  const [user, updateUser] = useState(null);
  const [fetchingUser, updateStatus] = useState(true);
  const [myError, updateError] = useState(null);
  const [data, updateData] = useState([]);
  const [interests, updateInterests] = useState([]);
  const [article, updateArticle] = useState([]);
  const [comments, updateComments] = useState([]);

  const handleTopicChange = (newInterests) => {
    updateInterests(newInterests);
  };

  const handleDataChange = (param) => {
    updateData(param);
  };

  const handleUserChange = (param) => {
    updateUser(param);
  };

  useEffect(() => {
    (async () => {
      try {
        let commentResponse = await axios.get(`${API_URL}/api/comments`, {
          withCredentials: true,
        });

        updateComments(commentResponse.data);
        console.log(commentResponse.data);
      } catch (err) {
        console.log("Comments fetch failed", err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let articleResponse = await axios.get(`${API_URL}/api/articles`, {
          withCredentials: true,
        });

        updateArticle(articleResponse.data);
        console.log(articleResponse.data);
      } catch (err) {
        console.log("Articles fetch failed", err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let userResponse = await axios.get(`${API_URL}/api/profile`, {
          withCredentials: true,
        });

        updateUser(userResponse.data);
        updateStatus(false);
      } catch (err) {
        console.log("User fetch failed", err);
        updateStatus(false);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSignIn = async (event) => {
    event.preventDefault();

    const { email, password } = event.target;

    let myUser = {
      email: email.value,
      password: password.value,
    };

    try {
      let response = await axios.post(`${API_URL}/api/signin`, myUser, {
        withCredentials: true,
      });

      updateUser(response.data);

      props.history.push("/profile");
      updateStatus(false);
    } catch (error) {
      updateError(error.response.data.error);
      updateStatus(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const {
      username,
      firstName,
      lastName,
      email,
      passwordHash,
      country,
      city,
      topics,
    } = event.target;

    let values = interests.map((i) => i.value);

    let newUser = {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      country: country.value,
      city: city.value,
      passwordHash: passwordHash.value,
      interests: values,
    };

    try {
      let response = await axios.post(`${API_URL}/api/signup`, newUser, {
        withCredentials: true,
      });
      updateUser(response.data);
      updateStatus(false);

      props.history.push("/profile");
    } catch (err) {
      console.log("Signup failed", err);
    }
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();
    const {
      username,
      firstName,
      lastName,
      email,
      passwordHash,
      country,
      city,
      topics,
    } = event.target;

    let values = interests.map((i) => i.value);

    let updatedUser = {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      country: country.value,
      city: city.value,
      passwordHash: passwordHash.value,
      interests: values,
    };

    try {
      let response = await axios.patch(
        `${API_URL}/api/${user._id}/edit`,
        updatedUser,
        {
          withCredentials: true,
        }
      );
      updateUser(response.data);
      console.log(response.data);
      updateStatus(false);

      props.history.push("/profile");
    } catch (err) {
      console.log("Edited failed", err);
      updateStatus(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });

      props.history.push("/");

      updateUser(null);
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const handleCreateArticle = async (event) => {
    event.preventDefault();
    const { section, subsection, title, body, created_date, author } =
      event.target;

    let newArticle = {
      section: section.value,
      subsection: subsection.value,
      title: title.value,
      body: body.value,
      created_date: created_date.value,
      author: author.value,
    };

    try {
      let response = await axios.post(`${API_URL}/api/create`, newArticle, {
        withCredentials: true,
      });
      updateArticle(response.data);
      updateStatus(false);

      props.history.push("/profile");
    } catch (err) {
      console.log("Creating Article failed", err);
    }
  };

  const handleCreateComments = async (event) => {
    event.preventDefault();
    const { commentBody } = event.target;
    let newComment = {
      commentBody: commentBody.value,
      authorId: user._id,
      author: user.username,
    };

    console.log(commentBody.value);
    console.log(newComment);
    console.log(user.comments);
    try {
      let response = await axios.post(
        `${API_URL}/api/comments/create`,
        newComment,
        { withCredentials: true }
      );
      console.log(response);
      updateComments(response.data);
      updateStatus(false);
      props.history.push("/profile");
    } catch (err) {
      console.log("Creating Comments failed", err);
    }
  };

  if (fetchingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/signin"
          render={(routerProps) => {
            return (
              <SignIn
                error={myError}
                onSignIn={handleSignIn}
                {...routerProps}
              />
            );
          }}
        />
        <Route
          exact
          path={"/profile"}
          render={(routerProps) => {
            return (
              <>
                <Navbar onLogOut={handleLogOut} user={user} />
                <Profile
                  data={data}
                  user={user}
                  article={article}
                  onDataChange={handleDataChange}
                  onLogOut={handleLogOut}
                  {...routerProps}
                />
              </>
            );
          }}
        />
        <Route
          exact
          path="/signup"
          render={(routeProps) => {
            return (
              <SignUp
                onSignUp={handleSignUp}
                {...routeProps}
                onTopicChange={handleTopicChange}
                interests={interests}
              />
            );
          }}
        />
        <Route
          exact
          path="/:id/edit"
          render={(routeProps) => {
            return (
              <>
                <Navbar onLogOut={handleLogOut} user={user} />

                <EditProfile
                  onEditProfile={handleEditProfile}
                  {...routeProps}
                  onTopicChange={handleTopicChange}
                  onUserChange={handleUserChange}
                  user={user}
                  updateUser={updateUser}
                  interests={interests}
                  article={article}
                />
              </>
            );
          }}
        />
        <Route
          exact
          path="/create"
          render={(routeProps) => {
            return (
              <>
                <Navbar onLogOut={handleLogOut} user={user} />
                <CreateArticle
                  {...routeProps}
                  article={article}
                  onCreateArticle={handleCreateArticle}
                />
              </>
            );
          }}
        />
        <Route
          exact
          path="/article/:id"
          render={(routeProps) => {
            return (
              <>
                <CreatedArticles
                  {...routeProps}
                  article={article}
                  onCreateComments={handleCreateComments}
                  comments={comments}
                  user={user}
                />
              </>
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
