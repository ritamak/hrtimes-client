import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SignUp from "./components/signup/SignUp";
import axios from "axios";

function App(props) {
  const { user, updateUser, newUser } = useState(null);

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
