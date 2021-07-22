import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/SignIn/SignIn";
import { API_URL } from "./config";
import SignUp from "./components/signup/SignUp";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/EditProfile/EditProfile";

function App(props) {
  const [user, updateUser] = useState(null);
  const [fetchingUser, updateStatus] = useState(true);
  const [myError, updateError] = useState(null);
  const [data, updateData] = useState([]);
  const [interests, updateInterests] = useState([]);

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
        console.log("Todo fetch failed", err);
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
    } catch (error) {
      updateError(error);
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
      let response = await axios.post(`${API_URL}/api/signup`, newUser);
      updateUser(response.data);

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
      let response = await axios.patch(`${API_URL}/${user._id}`, updatedUser, {
        withCredentials: true,
      });
      updateUser(response.data);
      console.log(response.data);
      props.history.push("/profile");
    } catch (err) {
      console.log("Edited failed", err);
    }
  };

  console.log(fetchingUser);

  const handleLogOut = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });

      props.history.push("/");

      updateUser(null);
    } catch (error) {
      console.log("Logout failed", error);
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
              <Profile
                data={data}
                user={user}
                onDataChange={handleDataChange}
                onLogOut={handleLogOut}
                {...routerProps}
              />
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
                onTopicChange={handleTopicChange}
                interests={interests}
              />
            );
          }}
        />
        <Route
          path="/:id"
          render={(routeProps) => {
            return (
              <EditProfile
                onEditProfile={handleEditProfile}
                {...routeProps}
                onTopicChange={handleTopicChange}
                onUserChange={handleUserChange}
                user={user}
                updateUser={updateUser}
                interests={interests}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
