import React, { useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { API_URL } from "../../config";

import { topStoriesTopics } from "../../data/data";

export default function EditProfile(props) {
  const { onUserChange, onEditProfile, interests, onTopicChange, user } = props;

  useEffect(() => {
    let userId = user._id;
    axios
      .get(`${API_URL}/api/${userId}`)
      .then((response) => {
        onUserChange(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputUsername">First Name</label>
              <input
                type="text"
                className="form-control"
                id="InputUsername"
                name="firstName"
                value={user.firstName}
              />
              <div className="form-group">
                <label htmlFor="InputUsername">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputUsername"
                  name="lastName"
                  value={user.lastName}
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
                value={user.email}
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
                value={user.country}
              />
              <div className="form-group">
                <label htmlFor="InputUsername">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputCity"
                  name="city"
                  value={user.city}
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
              />
              <small id="emailHelp" className="form-text text-muted">
                Re-enter your password even if you don't want to change it
              </small>
            </div>
            <h1>Interests</h1>
            <Select
              onChange={onTopicChange}
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
