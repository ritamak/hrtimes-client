import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/SignIn/SignIn";
import { API_URL } from "./config";
import SignUp from "./components/signup/SignUp";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/EditProfile/EditProfile";
import Footer from "./components/Footer/Footer";
import CreateArticle from "./components/CreateArticle/CreateArticle";
import EditArticle from "./components/EditArticle/EditArticle";
import ArticleDetails from "./components/ArticleDetails/ArticleDetails";
import Navbar from "./components/Navbar/Navbar";
import UserDetails from "./components/UserDetails/UserDetails";
import "./App.css";

function App(props) {
  const [user, updateUser] = useState(null);
  const [fetchingUser, updateStatus] = useState(true);
  const [myError, updateError] = useState(null);
  const [data, updateData] = useState([]);
  const [interests, updateInterests] = useState([]);
  const [articles, updateArticles] = useState([]);
  const [comments, updateComments] = useState([]);
  const [filteredData, updateFilteredData] = useState([]);
  const [follow, updateFollow] = useState([]);

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
        let userResponse = await axios.get(`${API_URL}/api/profile`, {
          withCredentials: true,
        });

        updateUser(userResponse.data);
        updateStatus(false);
      } catch (err) {
        console.log("Fetching user data failed", err);
        updateStatus(false);
      }
    })();
  }, []);

  useEffect(() => {}, [data]);

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
    let formData = new FormData();
    formData.append("imageUrl", event.target.myImage.files[0]);

    let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
    console.log(imgResponse);

    const {
      username,
      firstName,
      lastName,
      email,
      passwordHash,
      country,
      city,
      topics,
      myImage,
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
      image: imgResponse.data.image,
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
      updateStatus(false);
    }
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("imageUrl", event.target.myImage.files[0]);

    let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
    console.log(imgResponse);

    const {
      username,
      firstName,
      lastName,
      email,
      passwordHash,
      country,
      city,
      topics,
      myImage,
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
      image: imgResponse.data.image,
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

  const handleDeleteProfile = async (user) => {
    axios
      .delete(`${API_URL}/api/${user._id}`, { withCredentials: true })
      .then(() => {
        props.history.push("/");
        updateUser(null);
      })
      .catch((err) => {
        console.log("Delete failed!", err);
      });
  };

  const handleCreateArticle = async (event) => {
    event.preventDefault();
    const { section, subsection, title, body, created_date, myImage } =
      event.target;

    let formData = new FormData();
    formData.append("imageUrl", event.target.myImage.files[0]);
    let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
    console.log(imgResponse);

    let newArticle = {
      section: section.value,
      subsection: subsection.value,
      title: title.value,
      body: body.value,
      created_date: created_date.value,
      image: imgResponse.data.image,
    };

    try {
      let response = await axios.post(`${API_URL}/api/create`, newArticle, {
        withCredentials: true,
      });

      const { data } = response;
      updateArticles([data, ...articles]);
      updateStatus(false);
      props.history.push("/profile");
    } catch (err) {
      console.log("Creating Article failed", err);
    }
  };

  const handleEditArticle = async (event, id) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("imageUrl", event.target.myImage.files[0]);

    let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);

    const { section, subsection, title, body, created_date, author, myImage } =
      event.target;

    let updatedArticle = {
      section: section.value,
      subsection: subsection.value,
      title: title.value,
      body: body.value,
      created_date: created_date.value,
      image: imgResponse.data.image,
    };
    try {
      let response = await axios.patch(
        `${API_URL}/api/article/${id}/edit`,
        updatedArticle,
        {
          withCredentials: true,
        }
      );

      props.history.push(`/article/${id}`);
      updateArticles(response.data);
    } catch (err) {
      console.log("Edited failed", err);
      updateStatus(false);
    }
  };

  const handleDeleteArticle = (id) => {
    axios
      .delete(`${API_URL}/api/article/${id}`, { withCredentials: true })
      .then(() => {
        let updatedArticles = articles.filter((article) => {
          return article._id !== id;
        });

        updateArticles(updatedArticles);
        props.history.push("/profile");
      })
      .catch((err) => {
        console.log("Delete failed!", err);
      });
  };

  const handleCreateComments = async (event, articleId) => {
    event.preventDefault();
    const { commentBody } = event.target;

    let newComment = {
      commentBody: commentBody.value,
    };

    try {
      let response = await axios.post(
        `${API_URL}/api/article/${articleId}/comments/create`,
        newComment,
        { withCredentials: true }
      );
      const { data } = response;

      updateComments([data, ...comments]);
      updateStatus(false);
      props.history.push("/profile");
    } catch (err) {
      console.log("Creating Comments failed", err);
    }
  };

  const handleDeleteComment = (id) => {
    axios
      .delete(`${API_URL}/api/comments/${id}`, { withCredentials: true })
      .then(() => {
        let updatedComments = comments.filter((comment) => {
          return comment._id !== id;
        });

        updateComments(updatedComments);
        props.history.push("/profile");
      })
      .catch((err) => {
        console.log("Delete comments failed!", err);
      });
  };

  const handleSearch = (event) => {
    let searchedData = event.target.value;
    console.log(searchedData);
    let flatted = data.flat(Infinity);

    let filteredData = flatted.filter((element) => {
      console.log(data);
      let result = element.title
        .toLowerCase()
        .includes(searchedData.toLowerCase());
      console.log(result);
      return result;
    });
    updateFilteredData(filteredData);
  };

  const handleFollowUser = async (id) => {
    try {
      let followResponse = await axios.post(`${API_URL}/api/users/${id}`, { withCredentials: true });

      props.history.push("/profile");
      updateUser(followResponse);
    } catch (error) {
      console.log("User not followed!", error);
    }
  }

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
          path={"/profile"}
          render={(routerProps) => {
            return (
              <>
                <Navbar
                  onLogOut={handleLogOut}
                  user={user}
                  onSearch={handleSearch}
                />
                <Profile
                  data={data}
                  user={user}
                  articles={articles}
                  onDataChange={handleDataChange}
                  onLogOut={handleLogOut}
                  {...routerProps}
                  comments={comments}
                  updateComments={updateComments}
                  updateArticles={updateArticles}
                />
              </>
            );
          }}
        />
        <Route
          path="/signup"
          render={(routeProps) => {
            return (
              <SignUp
                onSignUp={handleSignUp}
                {...routeProps}
                error={myError}
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
                  onDeleteProfile={handleDeleteProfile}
                  {...routeProps}
                  onTopicChange={handleTopicChange}
                  onUserChange={handleUserChange}
                  user={user}
                  updateUser={updateUser}
                  interests={interests}
                  articles={articles}
                  fetchingUser={fetchingUser}
                  comments={comments}
                  updateComments={updateComments}
                  updateArticles={updateArticles}
                  onDeleteComment={handleDeleteComment}
                  updateStatus={updateStatus}
                  onDeleteArticle={handleDeleteArticle}
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
                  articles={articles}
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
                <Navbar onLogOut={handleLogOut} user={user} />
                <ArticleDetails
                  {...routeProps}
                  articles={articles}
                  onDeleteArticle={handleDeleteArticle}
                  onCreateComments={handleCreateComments}
                  user={user}
                />
              </>
            );
          }}
        />
        <Route
          exact
          path="/article/:id/edit"
          render={(routeProps) => {
            return (
              <>
                <Navbar user={user} onLogOut={handleLogOut} />
                <EditArticle
                  {...routeProps}
                  onEditArticle={handleEditArticle}
                />
              </>
            );
          }}
        />
        <Route
          exact
          path="/users/:id"
          render={(routeProps) => {
            return (
              <>
                <Navbar user={user} onLogOut={handleLogOut} />
                <UserDetails {...routeProps} onFollowUser={handleFollowUser}/>
              </>
            );
          }}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
