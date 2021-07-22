import React, { useEffect } from "react";
import Select from "react-select";

import { topStoriesTopics } from "../../data/data";

export default function EditProfile(props) {
  const { updateUser, onEditProfile, interests, onTopicChange, user } = props;

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
  const handleInterest = (event) => {
    let newInterest = event.target.value;
    updateUser({ ...user, interests: newInterest });
  };

  if (!user) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <>
        <div>
          <h1>Your info</h1>
          <form onSubmit={onEditProfile}>
            <div className="form-group">
              <label htmlFor="InputUsername">Username</label>
              <input
                type="text"
                className="form-control"
                id="InputUsername"
                name="username"
                placeholder={user.username}
                onChange={handleUserName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputUsername">First Name</label>
              <input
                type="text"
                className="form-control"
                id="InputUsername"
                name="firstName"
                onChange={handleFirstName}
              />
              <div className="form-group">
                <label htmlFor="InputUsername">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputUsername"
                  name="lastName"
                  onChange={handleLastName}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="InputEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="InputEmail"
                name="email"
                onChange={handleEmail}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="InputUsername">Country</label>
              <input
                type="text"
                className="form-control"
                id="InputCountry"
                name="country"
                onChange={handleCountry}
              />
              <div className="form-group">
                <label htmlFor="InputUsername">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputCity"
                  name="city"
                  onChange={handleCity}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="InputPassword">Password</label>
              <input
                name="passwordHash"
                type="password"
                className="form-control"
                id="InputPassword"
                placeholder="re-enter your password"
                onChange={handlePassword}
              />
              <small id="emailHelp" className="form-text text-muted">
                Re-enter your password even if you don't want to change it
              </small>
            </div>
            <h1>Interests</h1>
            <Select
              onChange={handleInterest}
              closeMenuOnSelect={false}
              defaultValue={[]}
              isMulti
              name="topics"
              options={topStoriesTopics}
              className="basic-multi-select"
              classNamePrefix="select"
              multiValue={interests}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </>
    </div>
  );
}
