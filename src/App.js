import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/SignIn/SignIn";
import { API_URL } from "./config";
import SignUp from "./components/signup/SignUp";

function App(props) {
  const { user, updateUser } = useState(null);
  const { myError, updateError } = useState(null);

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
    } = event.target;

    let newUser = {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      country: country.value,
      city: city.value,
      passwordHash: passwordHash.value,
    };

    try {
      await axios.post(`http://localhost:5005/api/signup`, newUser);
      props.history.push("/");
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
          path="/signup"
          render={(routeProps) => {
            return <SignUp onSignUp={handleSignUp} {...routeProps} />;
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
