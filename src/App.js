import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/SignIn/SignIn";
import { API_URL } from "./config";
import SignUp from "./components/signup/SignUp";
import Profile from "./components/Profile/Profile";

function App(props) {
  const [user, updateUser] = useState(null);
  const [myError, updateError] = useState(null);
  const [data, updateData] = useState([]);
  const [interests, updateInterests] = useState([]);
  const [loggedUser, updateLoggedUser] = useState(null);
  console.log(interests);

  const handleTopicChange = (newInterests) => {
    updateInterests(newInterests);
  };

  const handleDataChange = (param) => {
    updateData(param);
  };

  const getData = (param) => {
    return axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${param}.json?api-key=aE2ooFQxAx0es9T0hnh0CI0I54wQzTtM`
    );
  };

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
      let response = await axios.post(`${API_URL}/api/signin`, myUser);

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

    console.log(interests);
    console.log(topics);
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
    console.log(newUser.interests);
    try {
      let response = await axios.post(`${API_URL}/api/signup`, newUser);
      updateUser(response.data);

      props.history.push("/profile");
    } catch (err) {
      console.log("Signup failed", err);
    }
  };

  return (
    <div className="App">
      <Switch>
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
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path={"/profile"}
          render={() => {
            return (
              <Profile
                data={data}
                user={user}
                getData={getData}
                onDataChange={handleDataChange}
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
      </Switch>
    </div>
  );
}

export default withRouter(App);
