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
import CreatedArticles from "./components/CreatedArticles/CreatedArticles";
import Navbar from "./components/Navbar/Navbar";

function App(props) {
  const [user, updateUser] = useState(null);
  const [fetchingUser, updateStatus] = useState(true);
  const [myError, updateError] = useState(null);
  const [data, updateData] = useState([]);
  const [interests, updateInterests] = useState([]);
  const [articles, updateArticles] = useState([]);
  const [comments, updateComments] = useState([]);
  const [filteredData, updateFilteredData] = useState([]);

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

        updateArticles(articleResponse.data);
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

  const handleCreateArticle = async (event) => {
    event.preventDefault();
    const { section, subsection, title, body, created_date } = event.target;

    let newArticle = {
      section: section.value,
      subsection: subsection.value,
      title: title.value,
      body: body.value,
      created_date: created_date.value,
    };

    try {
      let response = await axios.post(`${API_URL}/api/create`, newArticle, {
        withCredentials: true,
      });

      const { data } = response;
      updateArticles([...articles, data]);
      updateStatus(false);
      props.history.push("/profile");
    } catch (err) {
      console.log("Creating Article failed", err);
    }
  };

  const handleEditArticle = (event, article) => {
    event.preventDefault();

    axios
      .patch(`${API_URL}/api/article/${article._id}/edit`, article, {
        withCredentials: true,
      })
      .then(() => {
        let updatedArticles = articles.map((singleArticle) => {
          if (singleArticle._id === article._id) {
            singleArticle.section = article.section;
            singleArticle.subsection = article.subsection;
            singleArticle.title = article.title;
            singleArticle.body = article.body;
            singleArticle.created_date = article.created_date;
            singleArticle.author = article.author;
          }
          return singleArticle;
        });
        props.history.push(`/article/${article._id}`);

        updateArticles(updatedArticles);
      })
      .catch((err) => {
        console.log("Edit failed!", err);
      });
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

      updateComments([...comments, data]);
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
                  {...routeProps}
                  onTopicChange={handleTopicChange}
                  onUserChange={handleUserChange}
                  user={user}
                  updateUser={updateUser}
                  interests={interests}
                  articles={articles}
                  onDeleteComment={handleDeleteComment}
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
                <CreatedArticles
                  {...routeProps}
                  articles={articles}
                  onDeleteArticle={handleDeleteArticle}
                  onCreateComments={handleCreateComments}
                  comments={comments}
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
                <Navbar onLogOut={handleLogOut} />
                <EditArticle
                  {...routeProps}
                  onEditArticle={handleEditArticle}
                />
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
